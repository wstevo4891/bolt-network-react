# app/controllers/api/movies_index_controller.rb

module Api
  # Movies Index API
  # Route for fetching an object of movies indexed by genre
  class MoviesIndexController < ApiController
    def index
      @movies_index = MoviesIndex.build
    end

    def show
      @movies_index = MoviesIndex.build(params[:slide_length])
    end
  end
end
