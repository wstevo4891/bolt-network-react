# app/controllers/api/movies/recent_controller.rb

module Api
  # Controller for /api/movies/recent route
  class RecentMoviesController < ApiController
    def index
      @movies = RecentMovies.create
    end
  end
end
