# app/controllers/api/movies_index_controller.rb

module Api
  # Movies Index API
  # Route for fetching an object of movies indexed by genre
  class MoviesIndexController < ApplicationController
    def show
      movies_index = MoviesIndex.build(params[:slide_length])

      render json: movies_index, status: :ok
    end
  end
end
