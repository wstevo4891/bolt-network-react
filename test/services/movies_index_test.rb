# test/services/movies_index_test.rb

require 'test_helper'

class MoviesIndexTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'should build index' do
    puts __method__
    index = MoviesIndex.new.call
    puts index

    assert_not_nil index
  end
end
