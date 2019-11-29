# app/controllers/api/movies_controller.rb

module Api
  # Movies API
  # Get Movie data as json
  class MoviesController < ApplicationController
    # GET /api/movies/:id
    def show
      @movie = Movie.find(params[:id])
    end
  end
end
