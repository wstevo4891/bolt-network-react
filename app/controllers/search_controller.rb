# app/controllers/search_controller.rb

class SearchController < PublicController
  def show
    @results = SearchResults.create(params[:query])
  end
end
