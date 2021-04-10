# frozen_string_literal: true

module Api
  # Movies Index API
  # Route for fetching an object of movies indexed by genre
  class MoviesIndexController < ApiController
    # GET /api/movies-index
    def index
      @movies_index = movies_index_from_cache
    end

    private

    def movies_index_from_cache
      Rails.cache.fetch('api.movies_index', expires_in: 1.hour) do
        MoviesIndex.new.value
      end
    end
  end
end
