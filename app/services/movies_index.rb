# app/services/movies_index.rb

# Service for building an object of movies
# indexed by genre name
class MoviesIndex
  def self.build(slide_length)
    new(slide_length).call
  end

  def initialize(slide_length)
    @slide_length = slide_length
    @genres = Genre.all
  end

  def call
    build_index
  end

  private

  def build_index
    @genres.each_with_object({}) do |genre, hash|
      hash[genre.name] = genre_movies(genre)
    end
  end

  def genre_movies(genre)
    genre.movies.take(18)
    # case @slide_length
    # when 6
    #   genre.movies.take(18)
    # when 5
    #   genre.movies.take(15)
    # else
    #   genre.movies.take(16)
    # end
  end
end
