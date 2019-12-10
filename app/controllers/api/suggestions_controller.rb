# Search Suggestions Controller

module Api
  # Controller for search suggestions
  class SuggestionsController < ApiController
    # GET /search/:query/:suggestion_id
    def show
      @results = SuggestionResults.create(params[:suggestion_id])
    rescue SuggestionResults::SuggestionIDError => e
      logger.debug(e.message)

      @results = SuggestionResults.new(params[:suggestion_id])
    end
  end
end
