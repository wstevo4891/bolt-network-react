# frozen_string_literal: true

# == Schema Information =======================================================
#
# Table: movies
# =========================================================
#
# id            :integer     not null, primary key
# title         :string      not null
# slug          :string      not null
# year          :integer     not null
# rating        :string      not null
# release_date  :date        not null
# runtime       :integer     not null
# plot          :text        not null
# photo         :string
# banner        :string
# logo          :string
# poster        :string
# genres_list   :string      array: true, default: []
# created_at    :datetime    not null
# updated_at    :datetime    not null
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
# Join Table: movies_people
# =========================================================
#
# movie_id   :integer
# person_id  :integer
#
# Indexes =============================
#
# index_movie_id   (movie_id)
# index_person_id  (person_id)
#
class Movie < ApplicationRecord
  # == Extensions =============================================================
  include MovieRoles
  include PgSearch::Model

  # == Constants ==============================================================
  INDEX_LIMIT = 24

  PERSON = 'Person'

  SEARCH_LIMITS = {
    MULTI: 10,
    SINGLE: 30
  }.freeze

  # == Uploaders ==============================================================
  mount_uploader :photo, PhotoUploader

  mount_uploader :banner, PhotoUploader

  mount_uploader :logo, PhotoUploader

  # == Relationships ==========================================================
  has_and_belongs_to_many :genres

  has_and_belongs_to_many :people

  has_and_belongs_to_many :actors, -> { actors }, class_name: PERSON

  has_and_belongs_to_many :directors, -> { directors }, class_name: PERSON

  has_and_belongs_to_many :writers, -> { writers }, class_name: PERSON

  has_many :credits

  has_many :reviews

  # == Validations ============================================================
  validates :title, :slug, :rating, :plot, presence: true

  validates :year, :runtime, numericality: { only_integer: true }

  # == Scopes =================================================================
  pg_search_scope :search_full_text,
                  against: %i[title genres_list directors writers actors],
                  using: %i[tsearch]

  scope :recent, -> { where('year > ?', 5.years.ago.year) }

  scope :lower_title, ->(query) { where('LOWER(title) LIKE ?', query) }

  scope :with_display_data, lambda do
    includes(:actors, :directors, :reviews, :writers)
  end

  # == Callbacks ==============================================================

  # == Class Methods ==========================================================
  def self.index_by_genre
    Rails.cache.fetch('movie.index_by_genre', expires_in: 1.hour) do
      Genre.includes(:movies).each_with_object({}) do |genre, hash|
        hash[genre.title] = genre.movies.take(INDEX_LIMIT)
      end
    end
  end

  def self.find_by_genre(genre_id)
    Genre.find(genre_id).movies
  end

  def self.by_first_char(query)
    where('lower(title) LIKE :prefix', prefix: "#{query}%")
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.find_people(query)
    matches = <<-SQL
      array_to_string(directors, '||') LIKE :match
        OR array_to_string(writers, '||') LIKE :match
        OR array_to_string(actors, '||') LIKE :match
    SQL

    select(:directors, :writers, :actors).where(matches, match: "%#{query}%")
  end

  # def self.search(search)
  #   where('title ~* :search', search: "(#{search})")
  # end

  def self.lower_case_match(query)
    where(arel_table[:title].lower.matches("%#{query}%"))
  end

  def self.title_match(query, limit)
    lower_case_match(query).limit(limit)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.find_by_genres(genres)
    limit = genres.length > 1 ? SEARCH_LIMITS[:MULTI] : SEARCH_LIMITS[:SINGLE]

    genres.each_with_object([]) do |genre, array|
      array.concat(genre.movies.limit(limit))
    end
  end

  def self.find_by_association(records)
    return [] if records.empty?

    limit = records.length > 1 ? SEARCH_LIMITS[:MULTI] : SEARCH_LIMITS[:SINGLE]

    records.each_with_object([]) do |record, array|
      array.concat(record.movies.limit(limit))
    end
  end

  def self.titles(genre)
    joins(:genres).where(genres: { title: genre }).pluck(:title)
  end

  # def self.search(query)
  #   match_title(query)
  #     .or(match_genre(query))
  #     .or(match_people(query))
  #     .select_search_columns
  #     .limit(SEARCH_LIMITS[:SINGLE])
  # rescue ActiveRecord::RecordNotFound
  #   []
  # end

  def self.search(query)
    match_title(query).select_search_columns.limit(SEARCH_LIMITS[:SINGLE])
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.match_title(query)
    lower_title("#{query}%").or(lower_title("%#{query}%"))
  end

  def self.match_genre(query)
    where("LOWER(array_to_string(genres_list, '||')) LIKE ?", "#{query}%")
  end

  def self.match_people(query)
    Person.match_name(query).first.movies
  end

  # def self.match_people(query)
  #   actors.match_name(query)
  #         .or(directors.match_name(query))
  #         .or(writers.match_name(query))
  # end

  def self.select_search_columns
    select(:id, :title, :slug, :photo, :year, :rating, :runtime, :plot, :genres_list)
  end

  def self.search_all_models(query)
    match = query.length > 1 ? "%#{query}%" : "#{query}%"

    search_by_title(match)
      .or(search_by_genre(match))
      .or(search_by_people(match))
      .limit(SEARCH_LIMITS[:SINGLE])
      .to_a
  end

  def self.search_by_title(match)
    includes(:genres, :people)
      .where('LOWER(movies.title) LIKE ?', match)
  end

  def self.search_by_genre(match)
    includes(:genres, :people)
      .where('LOWER(genres.title) LIKE ?', match)
      .references(:genres)
  end

  def self.search_by_people(match)
    includes(:genres, :people)
      .where('LOWER(people.name) LIKE ?', match)
      .references(:people)
  end

  def self.with_related_titles(id)
    includes(genres: [:movies]).find(id)
  end

  # == Instance Methods =======================================================
  def formatted_release_date
    release_date.strftime('%B %e, %Y')
  end
end
