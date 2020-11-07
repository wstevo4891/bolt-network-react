# frozen_string_literal: true

# == Schema Information =======================================================
#
# Table: genres
#
# id          :integer     not null, primary key
# title       :string
# slug        :string
# alias       :string
# created_at  :datetime    not null
# updated_at  :datetime    not null
#
class Genre < ApplicationRecord
  # == Extensions =============================================================
  include PgSearch::Model

  # == Constants ==============================================================
  MOST_MOVIES_LIMIT = 28

  SEARCH_LIMIT = 10

  # == Relationships ==========================================================
  has_and_belongs_to_many :movies
  has_many :subgenres

  # == Validations ============================================================
  validates :title, :slug, :alias, presence: true

  # == Scopes =================================================================
  pg_search_scope :full_text_search,
                  against: %i[title alias],
                  using: [:tsearch]

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
