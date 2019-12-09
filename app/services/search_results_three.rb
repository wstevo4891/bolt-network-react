# app/services/search_results.rb

# Service for search feature
class SearchResultsThree
  attr_reader :movies, :genres, :people

  def self.create(query)
    new(query).call
  end

  def initialize(query)
    @query = query.downcase
    @movies = []
    @genres = []
    @people = []
  end

  def call
    fetch_results
  end

  private

  def fetch_results
    @movies = search_movies(@query)
    @genres = Genre.search(@query).to_a
    @people = Person.search(@query).to_a
    self
  end

  def search_movies(query)
    Movie.search(query).sort_by do |movie|
      movie.title.downcase =~ /#{query}/ || 100
    end
  end
end
