# test/services/search_results_test.rb

require 'test_helper'

class SearchResultsTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'should find movies by genre' do
    puts __method__
    results = SearchResults.create('action')
    puts results.movies.size

    assert_not_predicate results.movies, :empty?
  end

  test 'should find movies by title' do
    puts __method__
    results = SearchResults.create('avengers')
    puts results.movies.size

    assert_not_predicate results.movies, :empty?
  end

  test 'should return results for one char' do
    puts __method__
    results = SearchResults.create('c')
    puts results.movies.size

    assert_not_predicate results.movies, :blank?
  end

  test 'should find results for plural genre' do
    puts __method__
    results = SearchResults.create('comedies')
    puts results.movies.size

    assert_not_predicate results.movies, :blank?
  end

  test 'should find people' do
    puts __method__
    results = SearchResults.create('Spielberg')

    assert_not_predicate results.people, :blank?
  end

  test 'should handle movies not found' do
    puts __method__
    results = SearchResults.create('&')

    assert_predicate results.movies, :empty?
  end

  # private

  # def search_all_models
  #   Movie
  #     .includes(:genres, :people)
  #     .where('lower(genres.title) like ?', '%spielberg%')
  #     .references(:genres)
  #     .or(
  #       Movie.includes(:genres, :people)
  #             .where('lower(people.name) like ?', '%spielberg%')
  #             .references(:people)
  #     ).or(
  #       Movie.includes(:genres, :people)
  #             .where('lower(movies.title) like ?', '%spielberg%')
  #     ).to_a
  # end
end
