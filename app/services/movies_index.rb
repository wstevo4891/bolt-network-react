# app/services/movies_index.rb

# Service for building an object of movies
# indexed by genre name
class MoviesIndex
  def self.build
    new.call
  end

  def initialize
    @genres = Genre.all
  end

  def call
    build_index
  end

  private

  def build_index
    @genres.each_with_object({}) do |genre, hash|
      hash[genre.name] = genre.movies
    end
  end
end
