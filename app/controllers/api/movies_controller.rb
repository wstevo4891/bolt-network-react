# app/controllers/api/movies_controller.rb

module Api
  # Movies API
  # Get Movie data as json
  class MoviesController < ApplicationController
    def show
      @movie = Movie.find(params[:id])
    end
  end
end
