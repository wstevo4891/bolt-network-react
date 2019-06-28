# test/models/movie_test.rb

require 'test_helper'

class MovieTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'should match first char' do
    puts __method__
    result = Movie.by_first_char('a')
    puts result.first.inspect

    assert_not_predicate result, :blank?
  end

  test 'should match lower case name' do
    puts __method__
    result = Movie.lower_case_match('avengers').first
    puts result.inspect

    assert_equal 'The Avengers', result.title
  end

  ##
  # Test pg_scope :search_by_title
  #
  test 'should match partial title' do
    puts __method__
    result = Movie.search_by_title('potter').first
    puts result.inspect

    assert_equal 'Harry Potter and the Deathly Hallows: Part 2', result.title
  end

  test 'can find by genre' do
    puts __method__
    genre = Genre.take
    puts genre.name

    result = Movie.find_by_genre(genre.id)
    puts result.first.inspect

    assert_not_predicate result, :blank?
  end

  test 'find by genre is accurate' do
    puts __method__
    genre = Genre.take
    puts genre.name

    result = Movie.find_by_genre(genre.id)
    accuracies = result.select { |m| m.genres_list.include?(genre.name) }

    assert_equal result.length, accuracies.length
  end

  ##
  # Test after_initialize callback
  #
  test 'should assign genres list' do
    puts __method__
    movie = Movie.take
    puts movie.title
    print movie.genres_list
    puts ''

    assert_not_predicate movie.genres_list, :blank?
  end

  test 'benchmark by first char' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('time') { Movie.by_first_char('a') }
    end
  end

  test 'benchmark lower case match' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('time')  { Movie.lower_case_match('avengers') }
    end
  end

  test 'benchmark search by title' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('time')  { Movie.search_by_title('avengers') }
    end
  end
end
