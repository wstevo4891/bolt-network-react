# app/controllers/api/genres_controller.rb

module Api
  # Genres API
  # Get Genre data as json
  class GenresController < ApplicationController
    def index
      @genres = Genre.all
    end

    def show
      @genre = Genre.find(params[:id])
    end

    def movie_ids
      @movie_ids = Genre.find(params[:id]).movie_ids
    end
  end
end
