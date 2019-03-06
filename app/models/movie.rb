# app/models/movie.rb

# Model for movies table
class Movie < ApplicationRecord
  # == Constants ============================================================

  # == Attributes ===========================================================
  attr_accessor :genres_list
  mount_uploader :photo, PhotoUploader
  # mount_uploaders :scenes, PhotoUploader

  # == Extensions ===========================================================
  include PgSearch

  # == Relationships ========================================================
  has_and_belongs_to_many :genres

  # == Validations ==========================================================
  validates :title, :year, :rated, :run_time, :plot, presence: true

  # == Scopes ===============================================================
  pg_search_scope :search_by_title, against: :title, using: [:tsearch]

  # == Callbacks ============================================================
  after_initialize do |movie|
    movie.genres_list = movie.three_genres
  end

  # == Class Methods ========================================================
  def self.search(search)
    Movie.where('title ~* :search', search: "(#{search})")
  end

  def self.find_by_genre(genre_id)
    Genre.find(genre_id).movies
  end

  def self.lookup(movie_id)
    movie = Movie.find(movie_id)
    movie.genres_list = movie.genres.map(&:name)
    movie
  end

  def self.by_first_char(query)
    where('lower(title) LIKE :prefix', prefix: "#{query}%")
  end

  def self.lower_case_match(query)
    where(Movie.arel_table[:title].lower.matches("%#{query}%"))
  end

  # == Instance Methods =====================================================
  def three_genres
    genres.limit(3).map(&:name)
  end
end
