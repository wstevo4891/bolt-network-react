# app/services/search_results_plus.rb

# Service for search feature
class SearchResultsTwo
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
    retrieve_results
  end

  private

  def retrieve_results
    @movies = Movie.search_all_models(@query)

    extract_genres_and_people

    self
  end

  def extract_genres_and_people
    @movies.each do |movie|
      @genres.concat(movie.genres)

      @people.concat(movie.people)
    end

    @genres.uniq!
    @people.uniq!
  end
end
