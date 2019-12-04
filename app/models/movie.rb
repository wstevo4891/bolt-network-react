# app/models/movie.rb

# Model for movies table
class Movie < ApplicationRecord
  # == Extensions ===========================================================
  include PgSearch::Model

  # == Attributes ===========================================================
  # attr_accessor :genres_list

  mount_uploader :photo, PhotoUploader

  mount_uploader :banner, PhotoUploader

  mount_uploader :logo, PhotoUploader

  # == Relationships ========================================================
  has_and_belongs_to_many :genres

  # == Validations ==========================================================
  validates :title, :year, :rated, :run_time, :plot, presence: true

  # == Scopes ===============================================================
  pg_search_scope :search_by_title, against: :title, using: [:tsearch]

  # scope :recent, -> { where('year > ?', 5.years.ago.year) }

  # == Callbacks ============================================================

  # == Class Methods ========================================================
  def self.search(search)
    where('title ~* :search', search: "(#{search})")
  end

  def self.find_by_genre(genre_id)
    Genre.find(genre_id).movies
  end

  def self.by_first_char(query)
    where('lower(title) LIKE :prefix', prefix: "#{query}%")
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.lower_case_match(query)
    where(arel_table[:title].lower.matches("%#{query}%"))
  end

  def self.title_match(query, limit)
    lower_case_match(query).limit(limit)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.find_by_genres(genres)
    limit = genres.length > 1 ? 5 : 20

    genres.each_with_object([]) do |genre, arr|
      arr.concat(genre.movies.limit(limit))
    end
  end

  def self.titles(genre)
    joins(:genres).where(genres: { title: genre }).pluck(:title)
  end

  def self.recent
    select { |movie| movie.year.to_i > 5.years.ago.year }
  end

  def self.index_by_genre
    Genre.all.each_with_object({}) do |genre, hash|
      hash[genre.title] = genre.movies.limit(24)
    end
  end

  # == Instance Methods =======================================================
end
