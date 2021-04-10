# frozen_string_literal: true

module Api
  # Controller for /api/movies/recent route
  class RecentMoviesController < ApiController
    # GET /api/recent-movies
    def index
      @movies = Movie.recent
    end
  end
end
