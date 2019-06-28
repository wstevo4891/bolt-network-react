require File.expand_path('../../config/environment', __FILE__)
require_relative '../config/environment'
require 'rails/test_help'

# Use benchmark for perf tests
require 'benchmark'

class ActiveSupport::TestCase
  include Benchmark

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
