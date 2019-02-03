# app/services/search_results.rb

class SearchResults
  attr_reader :query

  def self.create(query)
    new(query).call
  end

  def initialize(query)
    @query = query
  end

  def call
    retrieve_results
  end

  private

  def retrieve_results
    Movie.where('title = ?', query)
  end
end
