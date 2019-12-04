require 'test_helper'

class GenrePerformanceTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'benchmark Genre.by_first_char()' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('time') { Genre.by_first_char('c') }
    end
  end

  test 'benchmark Genre.lower_case_match()' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('time')  { Genre.lower_case_match('comedy') }
    end
  end

  test 'benchmark Genre.title_match()' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('time')  { Genre.title_match('act') }
    end
  end

  test 'benchmark Genre.with_most_movies()' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('single query') { Genre.with_most_movies }

      x.report('using index') { Genre.with_most_movies_index }
    end
  end
end
