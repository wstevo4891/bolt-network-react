# app/models/movie.rb

# Movie class
class Movie < ApplicationRecord
  has_and_belongs_to_many :genres
  mount_uploader :photo, PhotoUploader
  # mount_uploaders :scenes, PhotoUploader

  validates :title, :photo, :year, :rating, :length, :summary, presence: true

  def self.search(search)
    Movie.where('title ~* :search', search: "(#{search})")
  end
end
