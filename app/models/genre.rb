# app/models/genre.rb

# Class for movie genres
class Genre < ApplicationRecord
  has_and_belongs_to_many :movies
  has_many :subgenres
  validates :name, presence: true

  # include ActionView::Helpers::AssetTagHelper
  # include Rails.application.routes.url_helpers
  # include ActionView::Helpers::UrlHelper

  attr_accessor :movies_hash

  def build_movies_hash
    @movies_hash = {}
    @movie_ids.each do |movie_id|
      @movies_hash[movie_id] = Movie.find(movie_id)
    end
  end
end
