# test/models/genre_test.rb

require 'test_helper'

class GenreTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'should match first char' do
    puts __method__
    result = Genre.by_first_char('c').first
    puts result.inspect

    assert_not_nil result
    assert_equal 'Comedy', result.name
  end

  test 'should match lower case name' do
    puts __method__
    result = Genre.lower_case_match('comedy').first
    puts result.inspect

    assert_not_nil result
    assert_equal 'Comedy', result.name
  end

  test 'should match plural' do
    puts __method__
    result = Genre.full_text_search('comedies').first
    puts result.inspect

    assert_not_nil result
    assert_equal 'Comedy', result.name
  end
end
