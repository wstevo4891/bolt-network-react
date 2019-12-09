require 'test_helper'

class MoviePerformanceTest < ActiveSupport::TestCase
  def teardown
    puts ''
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
      x.report('time') { Movie.lower_case_match('avengers') }
    end
  end

  test 'benchmark search by title' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('Movie.search_by_title') { Movie.search_by_title('potter') }

      x.report('Movie.search') { Movie.search('potter') }

      x.report('Movie.lower_case_match') { Movie.lower_case_match('potter') }
    end
  end
end
