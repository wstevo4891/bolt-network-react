require 'test_helper'

class PersonTest < ActiveSupport::TestCase
  def teardown
    puts ''
  end

  test 'should find people by last name' do
    puts __method__

    result = Person.search('Spielberg')

    assert_equal ['Steven Spielberg'], result
  end
end
