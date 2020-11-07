# frozen_string_literal: true

# Service for generating Movie params to use in seeds.rb script
class MovieCreator
  WRITER_REGEX = /([\w\s]+)\s\(([\w\s]+)\)/.freeze

  delegate :title, to: :@movie

  def initialize(path)
    @path = path
    @data = load_movie_data
  end

  def create_movie
    params = MovieParams.build(@path, @data)

    @movie = Movie.create!(params)
  end

  def create_reviews
    reviews = @data['Ratings'].map do |rating|
      {
        source: rating['Source'],
        value: rating['Value'],
        movie_id: @movie.id
      }
    end

    Review.create!(reviews)
  end

  def create_credits
    creator = CreditCreator.new(@movie)

    creator.create_credits(MovieRoles::ROLES[:actor], @data['Actors'])
    creator.create_credits(MovieRoles::ROLES[:director], @data['Director'])
    creator.create_credits(MovieRoles::ROLES[:writer], @data['Writer'])
  end

  private

  def load_movie_data
    YAML.load_file(Rails.root.join(@path))
  end
end
