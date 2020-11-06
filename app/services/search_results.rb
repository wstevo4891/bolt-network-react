# frozen_string_literal: true

# Service for search results
class SearchResults
  attr_reader :movies, :genres, :people

  def initialize(query)
    @query = query.downcase
    @genres = Genre.search(@query).to_a
    @people = Person.search(@query).to_a
    @movies = search_movies
  end

  private

  def search_movies
    movies = sorted_movie_search
    return movies unless movies.empty?
    return @genres.first.movies unless @genres.empty?
    return @people.first.movies unless @people.empty?

    []
  end

  def sorted_movie_search
    Movie.search(@query).sort_by do |movie|
      movie.title.downcase =~ /#{@query}/ || 100
    end
  end
end
