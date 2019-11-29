# test/models/movie_test.rb

require 'test_helper'

class MovieTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'should match first char' do
    puts __method__
    result = Movie.by_first_char('a')

    assert_not_predicate result, :blank?
  end

  test 'should match lower case name' do
    puts __method__
    result = Movie.lower_case_match('avengers').first

    assert_equal 'The Avengers', result.title
  end

  ##
  # Test pg_scope :search_by_title
  #
  test 'should match partial title' do
    puts __method__
    result = Movie.search_by_title('potter').first

    assert_equal(
      'Harry Potter and the Deathly Hallows: Part 2',
      result.title
    )
  end

  test 'can find by genres' do
    puts __method__
    genres = Genre.take(3)

    result = Movie.find_by_genres(genres)

    assert_not_predicate result, :blank?
  end

  test 'should return recent movies' do
    puts __method__
    movies = Movie.recent

    assert_not_predicate movies, :blank?
  end

  test 'should build movies index' do
    puts __method__
    index = Movie.index_by_genre

    assert_not_predicate index, :blank?
  end

  test 'should index movies by genre' do
    puts __method__
    genres = Genre.pluck(:title)
    index = Movie.index_by_genre

    assert_equal genres, index.keys
  end
end
