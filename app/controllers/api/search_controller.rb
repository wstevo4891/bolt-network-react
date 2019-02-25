# app/controllers/api/search_controller.rb

module Api
  # Controller for /api/search route
  class SearchController < ApiController
    def show
      @results = SearchResults.create(params[:query])

      if results_found?
        render json: @results, status: :ok
      else
        render json: not_found, status: :not_found
    end

    private

    def results_found?
      !@results[:genres].empty? && !@results[:movies].empty?
    end

    def not_found
      { genres: 'Not Found', movies: 'Not Found' }
    end
  end
end
