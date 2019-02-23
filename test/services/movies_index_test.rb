# test/services/movies_index_test.rb

require 'test_helper'

class MoviesIndexTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'should build index' do
    puts __method__
    index = MoviesIndex.build(4)
    puts JSON.pretty_generate(index)

    assert_not_predicate index, :blank?
    assert_equal index.keys, Genre.pluck(:name)
    assert_kind_of Enumerable, index['Action']
  end

  test 'should take 18 movies' do
    puts __method__
    @index = MoviesIndex.build(6)

    movies_length_test(18)
  end

  test 'should take 15 movies' do
    puts __method__
    [5, 3].each do |i|
      @index = MoviesIndex.build(i)
      movies_length_test(15)
    end
  end

  test 'should take 16 movies' do
    puts __method__
    [4, 2].each do |i|
      @index = MoviesIndex.build(i)
      movies_length_test(16)
    end
  end

  private

  def movies_length_test(len)
    @index.each_value do |value|
      assert_equal len, value.length
    end
  end
end
