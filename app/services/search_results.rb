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
    Genre.where('lower(name) LIKE :prefix', prefix: "#{query}%")
  rescue ActiveRecord::RecordNotFound
    []
  end

  def movies_by_first_char
    Movie.where('lower(title) LIKE :prefix', prefix: "#{query}%")
  rescue ActiveRecord::RecordNotFound
    []
  end

  def full_match_results
    @genres = genre_name_match

    { genres: @genres.to_a, movies: movie_results }
  end

  def movie_results
    if genres.empty?
      movie_title_match
    else
      concat_movies_by_genre
    end
  end

  def genre_name_match
    Genre.where(Genre.arel_table[:name].lower.matches("%#{query}%"))
  rescue ActiveRecord::RecordNotFound
    []
  end

  def movie_title_match
    Movie.where(Movie.arel_table[:title].lower.matches("%#{query}%"))
  rescue ActiveRecord::RecordNotFound
    []
  end

  def concat_movies_by_genre
    genres.each_with_object([]) do |genre, arr|
      arr.concat(genre.movies)
    end
  end
end
