# app/services/movies_index.rb

# Service for building an object of movies
# indexed by genre name
class MoviesIndex
  attr_reader :genres, :movies

  def initialize
    @genres = Genre.all
    @movies = Movie.all
  end

  def call
    build_movies_index
  end

  private

  def build_movies_index
    index = {}

    @genres.each do |genre|
      index[genre.name] = []

      @movies.each do |movie|
        next unless movie.genre_ids.include?(genre.id)

        index[genre.name].push(movie)
      end
    end

    index
  end
end
