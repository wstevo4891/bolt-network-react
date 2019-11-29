require 'test_helper'

class MoviePerfTest < ActiveSupport::TestCase
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
