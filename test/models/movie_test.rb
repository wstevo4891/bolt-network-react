# test/models/movie_test.rb

require 'test_helper'

class MovieTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'should match first char' do
    puts __method__
    result = Movie.by_first_char('a').first
    puts result.inspect

    assert_not_nil result
  end

  test 'should match lower case name' do
    puts __method__
    result = Movie.lower_case_match('avengers').first
    puts result.inspect

    assert_not_nil result
    assert_equal 'The Avengers', result.title
  end

  test 'should match partial title' do
    puts __method__
    result = Movie.search_by_title('potter').first
    puts result.inspect

    assert_not_nil result
    assert_equal 'Harry Potter and the Deathly Hallows: Part 2', result.title
  end
end
