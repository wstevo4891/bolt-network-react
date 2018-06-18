# app/models/genre.rb

# Class for movie genres
class Genre < ApplicationRecord
  has_and_belongs_to_many :movies
  has_many :subgenres

  validates :name, presence: true
end
