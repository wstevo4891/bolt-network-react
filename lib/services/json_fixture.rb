# frozen_string_literal: true

# Service for writing a JSON fixture for javascript tests
class JSONFixture
  def self.create(genre)
    new(genre).call
  end

  def initialize(genre)
    @genre = genre
    @file = file_path(genre)
  end

  def call
    write_fixture
  end

  private

  def file_path(genre)
    Rails.root.join('test/javascript/__fixtures__', "#{genre.downcase}.json")
  end

  def write_fixture
    puts 'Writing fixture to file:'
    puts @file

    puts 'Loading movies...'
    movies = Genre.where(title: @genre.capitalize).first.movies

    h = JSON.parse(movies.to_json)

    puts 'Writing JSON...'
    File.open(@file, 'w+') do |f|
      f.write(JSON.pretty_generate(h))
    end

    puts 'Fixture created!'
  end
end
