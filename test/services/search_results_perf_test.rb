require 'test_helper'

class SearchResultsPerfTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'search results performance on movie title' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('Search Results') { SearchResults.create('avengers') }

      x.report('Search Results Plus') { SearchResultsPlus.create('avengers') }

      x.report('Search Results Three') { SearchResultsThree.new('avengers') }
    end
  end

  test 'search results performance on genre title' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('Search Results') { SearchResults.create('comedy') }

      x.report('Search Results Plus') { SearchResultsPlus.create('comedy') }

      x.report('Search Results Three') { SearchResultsThree.new('comedy') }
    end
  end

  test 'search results performance on person name' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('Search Results') { SearchResults.create('spielberg') }

      x.report('Search Results Plus') { SearchResultsPlus.create('spielberg') }

      x.report('Search Results Three') { SearchResultsThree.new('comedy') }
    end
  end
end
