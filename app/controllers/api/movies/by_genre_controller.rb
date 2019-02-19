# app/controllers/api/movies/by_genre_controller.rb

module Api
  module Movies
    # Controller for api route: /api/movies/by-genre/:genre_id
    class ByGenreController < ApplicationController
      def show
        @movies = Genre.find(params[:genre_id]).movies
      end
    end
  end
end
