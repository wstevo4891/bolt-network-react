# frozen_string_literal: true

module Api
  module Movies
    # Movies Index API
    # Route for fetching an object of movies indexed by genre
    class TopGenresController < ApiController
      CACHE_KEY = 'api.movies.top_genres.index'

      # GET /api/movies/top-genres
      def index
        @movies_index = movies_index_from_cache
      end

      private

      def movies_index_from_cache
        Rails.cache.fetch(CACHE_KEY, expires_in: 1.hour) do
          TopGenresIndex.call
        end
      end
    end
  end
end
