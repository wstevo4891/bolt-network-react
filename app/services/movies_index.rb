# app/services/movies_index.rb

# Service for building an object of movies
# indexed by genre name
class MoviesIndex
  def self.build(slide_length)
    new(slide_length).call
  end

  def initialize(slide_length)
    @limit = length_map[slide_length]
    @genres = Genre.all
  end

  def call
    build_index
  end

  private

  def length_map
    {
      '6' => 24,
      '5' => 20,
      '4' => 20,
      '3' => 18,
      '2' => 12
    }
  end

  def build_index
    @genres.each_with_object({}) do |genre, hash|
      hash[genre.name] = genre_movies(genre)
    end
  end

  def genre_movies(genre)
    movies = genre.movies.limit(@limit)

    movies.each do |movie|
      movie.genres_list = movie.genres.map(&:name)
    end

    movies
  end

  # Netflix's slide number per slide_length
  # =======================================
  # def true_length_map
  #   {
  #     6 => 42,
  #     5 => 40,
  #     4 => 40,
  #     3 => 39,
  #     2 => 38
  #   }
  # end
end
