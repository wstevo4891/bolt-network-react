# test/services/movies_index_test.rb

require 'test_helper'

class MoviesIndexTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'should build index' do
    puts __method__
    index = MoviesIndex.build
    puts JSON.pretty_generate(index)

    assert_not_predicate index, :blank?
    assert_equal index.keys, Genre.pluck(:name)
    assert_kind_of Enumerable, index['Action']
  end
end
