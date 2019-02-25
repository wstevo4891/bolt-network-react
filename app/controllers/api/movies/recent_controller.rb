# app/controllers/api/movies/recent_controller.rb

module Api
  module Movies
    # Controller for /api/movies/recent route
    class RecentController < ApiController
      def show
        @movies = RecentMovies.create
      end
    end
  end
end
