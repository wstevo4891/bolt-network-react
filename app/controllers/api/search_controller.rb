# frozen_string_literal: true

module Api
  # Controller for /api/search route
  class SearchController < ApiController
    # GET /api/search/:query
    def show
      @results = SearchResults.new(params[:query])
    end
  end
end
