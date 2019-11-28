# app/controllers/api/movies_index_controller.rb

module Api
  # Movies Index API
  # Route for fetching an object of movies indexed by genre
  class MoviesIndexController < ApiController
    def index
      @movies_index = Movie.index_by_genre
    end
  end
end
