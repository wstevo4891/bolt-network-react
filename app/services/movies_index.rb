# app/services/movies_index.rb

# Service for building an object of movies
# indexed by genre name
class MoviesIndex
  attr_reader :genres, :movies

  def self.build
    new.call
  end

  def initialize
    @genres = Genre.all
    @movies = Movie.all
  end

  def call
    build_index
  end

  private

  def build_index
    genres.each_with_object({}) do |genre, hash|
      hash[genre.name] = movies_array(genre.id)
    end
  end

  def movies_array(genre_id)
    movies.select { |movie| movie.genre_ids.include?(genre_id) }
  end
end
