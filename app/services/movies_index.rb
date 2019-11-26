# app/services/movies_index.rb

# Service for building an object of movies
# indexed by genre name
class MoviesIndex
  LENGTH_MAP = {
    '6' => 24,
    '5' => 20,
    '4' => 20,
    '3' => 18,
    '2' => 12
  }.freeze

  def self.build(slide_length = '6')
    new(slide_length).call
  end

  def initialize(slide_length = '6')
    @limit = LENGTH_MAP[slide_length]
  end

  def call
    build_index
  end

  private

  def build_index
    Genre.all.each_with_object({}) do |genre, hash|
      hash[genre.title] = genre.movies.limit(@limit)
    end
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
