# app/controllers/api/search_controller.rb

module Api
  # Controller for /api/search route
  class SearchController < ApiController
    def show
      @results = SearchResults.create(params[:query])
    end
  end
end
