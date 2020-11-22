# frozen_string_literal: true

module Api
  # Controller for search suggestions
  class SuggestionsController < ApiController
    # GET /search/:query/:suggestion_id
    def show
      @results = SuggestionResults.new(params[:suggestion_id])
    end
  end
end
