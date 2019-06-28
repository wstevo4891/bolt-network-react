# test/services/search_results_test.rb

require 'test_helper'

class SearchResultsTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'should find movies by genre' do
    puts __method__
    results = SearchResults.create('action')
    puts results[:movies].count

    assert_not_predicate results[:movies], :empty?
  end

  test 'should find movies by title' do
    puts __method__
    results = SearchResults.create('avengers')
    puts results[:movies].count

    assert_not_predicate results[:movies], :empty?
  end

  test 'should return results for one char' do
    puts __method__
    results = SearchResults.create('c')
    puts results[:movies].count

    assert_not_predicate results[:movies], :blank?
  end

  test 'should find results for plural genre' do
    puts __method__
    results = SearchResults.create('comedies')
    puts results[:movies].count

    assert_not_predicate results[:movies], :blank?
  end

  test 'should handle results not found' do
    puts __method__
    results = SearchResults.create('&')
    puts results

    assert_equal results, { genres: [], movies: [] }
  end
end
