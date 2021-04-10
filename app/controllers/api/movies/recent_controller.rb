# frozen_string_literal: true

module Api
  module Movies
    # Controller for /api/movies/recent route
    class RecentController < ApiController
      # GET /api/movies/recent
      def index
        @movies = Movie.recent
      end
    end
  end
end
