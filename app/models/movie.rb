# app/models/movie.rb

# Model for movies table
class Movie < ApplicationRecord
  has_and_belongs_to_many :genres
  mount_uploader :photo, PhotoUploader
  # mount_uploaders :scenes, PhotoUploader

  validates :title, :year, :rated, :run_time, :plot, presence: true

  def self.search(search)
    Movie.where('title ~* :search', search: "(#{search})")
  end

  def self.find_by_genre(genre_id)
    Movie.joins(:genres_movies).where(genres_movies: {genre_id: genre_id})
  end
end
