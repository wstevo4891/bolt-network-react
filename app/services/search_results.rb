# app/services/search_results.rb

# Service for search feature
class SearchResults
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
    @genres = search_genres
    @people = Person.search(@query).to_a
    @movies = search_movies

    self
  end

  def search_genres
    if @query.length == 1
      Genre.by_first_char(@query).to_a
    else
      Genre.title_match(@query).to_a
    end
  end

  def search_movies
    if @query.length == 1
      full_movies_search
    else
      movie_titles_search
    end
  end

  def full_movies_search
    first_search = Movie.by_first_char(@query).limit(15).to_a

    if @genres.empty?
      first_search
    else
      first_search + Movie.find_by_genres(@genres)
    end
  end

  def movie_titles_search
    if @genres.empty?
      Movie.title_match(@query, 15)
    else
      Movie.find_by_genres(@genres)
    end
  end
end
