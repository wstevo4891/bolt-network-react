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

  # test 'benchmark by first char' do
  #   puts __method__

  #   10.times do
  #     Benchmark.bmbm do |x|
  #       x.report('time') { Movie.by_first_char('a') }
  #     end
  #   end
  # end

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
end
