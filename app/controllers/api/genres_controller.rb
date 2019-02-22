# app/controllers/api/genres_controller.rb

module Api
  # Genres API
  # Get Genre data as json
  class GenresController < ApplicationController
    def index
      @genres = Genre.all
    end

    def show
      @results = genre_results

      render json: @results, status: :ok
    end

    def movie_ids
      @movie_ids = Genre.find(params[:id]).movie_ids
    end

    private

    def genre_results
      genre = Genre.find(params[:id])

      { genre: genre, movies: genre.movies }
    end
  end
end
