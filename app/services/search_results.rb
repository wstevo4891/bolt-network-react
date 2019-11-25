# app/services/search_results.rb

# Service for search feature
class SearchResults
  attr_reader :query, :genres, :movies

  def self.create(query)
    new(query).call
  end

  def initialize(query)
    @query = query.downcase
  end

  def call
    retrieve_results
  end

  private

  def retrieve_results
    @genres = search_genres
    @movies = search_movies

    { genres: @genres, movies: @movies }
  end

  def search_genres
    if @query.length == 1
      Genre.by_first_char(@query).to_a
    else
      Genre.name_match(@query).to_a
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
    first_search = movies_by_first_char

    if @genres.empty?
      first_search
    else
      first_search.concat(concat_movies_by_genre)
    end
  end

  def movies_by_first_char
    Movie.by_first_char(@query).limit(15).to_a
  end

  def concat_movies_by_genre
    limit = @genres.length > 1 ? 5 : 20

    @genres.each_with_object([]) do |genre, arr|
      arr.concat(genre.movies.limit(limit))
    end
  end

  def movie_titles_search
    if @genres.empty?
      Movie.title_match(@query, 15)
    else
      concat_movies_by_genre
    end
  end
end
