# app/services/search_results.rb

class SearchResults
  attr_reader :query, :genres, :movies

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
    if @query.length == 1
      first_char_match
    else
      full_match_results
    end
  end

  def first_char_match
    genres_list = genres_by_first_char
    
    movies_list = movies_by_first_char

    { genres: genres_list, movies: movies_list }
  end

  def genres_by_first_char
    Genre.where('name LIKE :prefix', prefix: "#{query}%")
  end

  def movies_by_first_char
    Movie.where('name LIKE :prefix', prefix: "#{query}%")
  end

  def full_match_results
    @genres = genre_name_match

    { genres: @genres, movies: movie_results }
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
  end

  def movie_title_match
    Movie.where(Movie.arel_table[:title].lower.matches("%#{query}%"))
  end

  def concat_movies_by_genre
    @movies = Movie.all

    genre_ids_list.each_with_object([]) do |genre_id, arr|
      arr.concat(movies_by_genre(genre_id))
    end
  end

  def genre_ids_list
    genres.each_with_object([]) { |genre, arr| arr << genre.id }
  end

  def movies_by_genre(genre_id)
    movies.select { |movie| movie.genre_ids.include?(genre_id) }
  end
end
