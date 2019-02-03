# app/controllers/search_controller.rb

class SearchController < ApplicationController
  def show
    @results = SearchResults.create(params[:query])
  end
end
