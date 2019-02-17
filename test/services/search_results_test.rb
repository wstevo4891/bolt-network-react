# test/services/search_results_test.rb

require 'test_helper'

class SearchResultsTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'should find movies by genre' do
    puts __method__
    results = SearchResults.create('action')
    puts results

    assert_not_predicate results[:movies], :empty?
  end

  test 'should find movies by title' do
    puts __method__
    results = SearchResults.create('avengers')
    puts results

    assert_not_predicate results[:movies], :empty?
  end

  test 'should return results for one char' do
    puts __method__
    results = SearchResults.create('c')
    puts results

    assert_not_nil results
    assert_not_predicate results[:movies], :empty?
  end
end
