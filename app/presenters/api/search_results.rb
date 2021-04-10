# frozen_string_literal: true

module Api
  # Presenter for API search results
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
      return genre_movies unless @genres.empty?
      return person_movies unless @people.empty?

      []
    end

    def sorted_movie_search
      Movie.search(@query).sort_by do |movie|
        movie.title.downcase =~ /#{@query}/ || 100
      end
    end

    def genre_movies
      @genres.first.movies.select_search_columns
    end

    def person_movies
      @people.first.movies.select_search_columns
    end
  end
end
