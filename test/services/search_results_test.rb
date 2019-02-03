# test/services/search_results_test.rb

require 'test_helper'

class SearchResultsTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'should find genres' do
    puts __method__
    results = SearchResults.create('action')
    puts results

    assert_not_predicate results[:genres], :empty?
  end

  test 'should find movies' do
    puts __method__
    results = SearchResults.create('avengers')
    puts results

    assert_not_predicate results[:movies], :empty?
  end
end
