# frozen_string_literal: true

# Presenter for building movies index Hash
class MoviesIndex
  MOVIES_LIMIT = 24

  TOP_GENRES = %w[
    Action
    Adventure
    Comedy
    Drama
    Animation
    Family
    Romance
    Fantasy
    Sci-Fi
    Horror
  ].freeze

  attr_reader :genres, :value

  def initialize
    @genres = top_genres
    @value = build_movies_index
  end

  private

  def top_genres
    Genre.with_movies.where(title: TOP_GENRES).select(:id, :title)
  end

  def build_movies_index
    genres.each_with_object({}) do |genre, hash|
      hash[genre.title] = genre.movies.take(MOVIES_LIMIT)
    end
  end
end
