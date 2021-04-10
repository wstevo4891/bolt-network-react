# frozen_string_literal: true

# == Schema Information =======================================================
#
# Table: genres
# =========================================================
#
# id          :integer     not null, primary key
# title       :string      not null
# slug        :string      not null
# alias       :string      not null
# created_at  :datetime    not null
# updated_at  :datetime    not null
#
# Join Table: genres_movies
# =========================================================
#
# genre_id  :integer
# movie_id  :integer
#
# Indexes =============================
#
# index_genre_id  (genre_id)
# index_movie_id  (movie_id)
#
class Genre < ApplicationRecord
  # == Constants ==============================================================
  FULL_TEXT_SEARCH_SETTINGS = {
    against: %i[title alias],
    using: %i[tsearch]
  }.freeze

  MOST_MOVIES_LIMIT = 28

  TOP_GENRES = %w[
    Action
    Adventure
    Comedy
    Drama
    Animation
    Family
    Romance
    Fantasy
    Sci-Fi
    Horror
  ].freeze

  SEARCH_LIMIT = 10

  # == Extensions =============================================================
  include FullTextSearch

  # == Relationships ==========================================================
  belongs_to :parent, class_name: 'Genre'

  has_and_belongs_to_many :movies

  has_many :sub_genres, class_name: 'Genre'

  # == Validations ============================================================
  validates :title, :slug, :alias, presence: true

  # == Scopes =================================================================
  scope :with_movies, -> { includes(:movies).select(:id, :title) }

  scope :top, -> { where(title: TOP_GENRES) }

  # == Class Methods ==========================================================
  def self.by_first_char(query)
    where('lower(title) LIKE :prefix', prefix: "#{query}%")
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.lower_case_match(query)
    where(arel_table[:title].lower.matches("%#{query}%"))
  end

  def self.title_match(query)
    genres = lower_case_match(query)

    return genres unless genres.empty?

    full_text_search(query)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.search(query)
    select(:id, :alias).match_title(query).limit(SEARCH_LIMIT)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.match_title(query)
    where('LOWER(title) LIKE ?', "#{query}%")
      .or(where('LOWER(alias) LIKE ?', "#{query}%"))
  end

  ##
  # Single query to find genres with the most movies
  #
  # This method is significantly faster than the one below.
  #
  def self.with_most_movies
    joins(:genres_movies)
      .group('genres.id')
      .having('COUNT(genre_id) > ?', MOST_MOVIES_LIMIT)
      .pluck(:title)
  end

  def self.with_most_movies_index
    select { |genre| genre.movies.size > MOST_MOVIES_LIMIT }.pluck(:title)
  end

  # == Instance Methods =======================================================
end
