# app/controllers/api/movies/recent_controller.rb

module Api
  # Controller for /api/movies/recent route
  class RecentMoviesController < ApiController
    # GET /api/recent-movies
    def index
      @movies = Movie.recent
    end
  end
end
