# app/services/search_results.rb

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
    if @query.length == 1
      first_char_match
    else
      full_match_results
    end
  end

  def first_char_match
    @genres = genres_by_first_char
    
    movies_list = full_movies_search

    { genres: @genres.to_a, movies: movies_list }
  end

  def full_movies_search
    first_search = movies_by_first_char.to_a

    if genres.empty?
      first_search
    else
      second_search = concat_movies_by_genre

      first_search.concat(second_search)
    end
  end

  def genres_by_first_char
    Genre.by_first_char(query)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def movies_by_first_char
    Movie.by_first_char(query).limit(15)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def full_match_results
    @genres = genre_name_match

    { genres: @genres.to_a, movies: movie_results }
  end

  def genre_name_match
    genres = Genre.lower_case_match(query)

    return genres unless genres.empty?

    Genre.full_text_search(query)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def movie_results
    if genres.empty?
      movie_title_match
    else
      concat_movies_by_genre
    end
  end

  def movie_title_match
    Movie.lower_case_match(query).limit(15)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def concat_movies_by_genre
    limit = genres.length > 1 ? 5 : 20

    genres.each_with_object([]) do |genre, arr|
      arr.concat genre.movies.limit(limit)
    end
  end
end
