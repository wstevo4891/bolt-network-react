# app/models/movie.rb

# Model for movies table
class Movie < ApplicationRecord
  attr_accessor :genres_list

  has_and_belongs_to_many :genres
  mount_uploader :photo, PhotoUploader
  # mount_uploaders :scenes, PhotoUploader

  validates :title, :year, :rated, :run_time, :plot, presence: true

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
end
