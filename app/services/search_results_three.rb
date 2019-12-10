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
    @genres = Genre.search(@query).to_a
    @people = Person.search(@query).to_a
    @movies = search_movies
    # add_movies_with_genres_and_people
    self
  end

  def search_movies
    Movie.search(@query).sort_by do |movie|
      movie.title.downcase =~ /#{@query}/ || 100
    end
  end

  def add_movies_with_genres_and_people
    return if @movies.size >= 30

    records = @genres + @people

    @movies.concat(Movie.find_by_association(records))
  end
end
