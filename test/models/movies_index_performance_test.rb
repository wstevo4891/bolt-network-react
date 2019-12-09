require 'test_helper'

class MoviesIndexPerformanceTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'benchmark eager loading movies index' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('includes') { Genre.includes(:movies) }

      x.report('eager load') { Genre.eager_load(:movies) }
    end
  end

  test 'benchmark movies index by genre' do
    puts __method__

    Benchmark.bmbm do |x|
      x.report('Movie.index_by_genre') { movie_index_by_genre }

      x.report('includes index') { movies_index_includes }

      x.report('eager load index') { movies_index_eager }

      x.report('preload index') { movies_index_preload }

      x.report('movies index select') { movies_index_select }
    end
  end

  private

  def movie_index_by_genre
    Genre.all.each_with_object({}) do |genre, hash|
      hash[genre.title] = genre.movies.limit(24)
    end
  end

  def movies_index_includes
    Genre.includes(:movies).each_with_object({}) do |genre, hash|
      hash[genre.title] = genre.movies.take(24)
    end
  end

  def movies_index_eager
    Genre.eager_load(:movies).each_with_object({}) do |genre, hash|
      hash[genre.title] = genre.movies.take(24)
    end
  end

  def movies_index_preload
    Genre.preload(:movies).each_with_object({}) do |genre, hash|
      hash[genre.title] = genre.movies.take(24)
    end
  end

  def movies_index_select
    movies = Movie.all

    Genre.pluck(:title).each_with_object({}) do |genre, hash|
      hash[genre] = movies.select do |movie|
        movie.genres_list.first == genre
      end.take(24)
    end
  end
end
