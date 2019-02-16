# app/controllers/api/movies_index_controller.rb

module Api
  # Movies Index API
  # Route for fetching an object of movies indexed by genre
  class MoviesIndexController < ApplicationController
    def index
      movies_index = MoviesIndex.build

      render json: movies_index
    end
  end
end
