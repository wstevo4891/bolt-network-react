# frozen_string_literal: true

# Service for building YAML fixtures for movies
class MovieFixtures
  # == Constants ==============================================================
  FILE = Rails.root.join('test/fixtures/movies.yml')
  REJECTS = %w[id created_at updated_at].freeze

  # == Class Methods ==========================================================
  def self.write
    new.call
  end

  # == Instance Methods =======================================================
  def initialize
    @movies = load_movies
    @data = {}
  end

  def call
    write_fixtures
  end

  private

  def load_movies
    puts 'Loading movies...'

    Movie.all.map do |movie|
      genres = Genre.find(movie.genre_ids).pluck(:title).join(', ')

      genres_hash = { 'genres' => genres }

      movie.attributes.reject do |key, _value|
        REJECTS.include?(key)
      end.merge(genres_hash)
    end
  end

  def write_fixtures
    puts 'Building Hash for YAML...'
    @movies.each_with_index do |movie, index|
      data_key = (index + 1).humanize

      @data[data_key] = movie
    end

    puts 'Writing Fixtures...'
    File.open(@file, 'w') { |f| f.write @data.to_yaml }

    puts 'Movie fixtures written!'
  end
end
