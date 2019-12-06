# lib/tasks/fixtures.rake

require 'services/json_fixture'
require 'services/movie_fixtures'

# YAML.dump(hash, file_path)

namespace :fixtures do
  ##
  # fixtures:json
  # ===================================
  # Create javascript test fixtures as JSON
  #
  # Writes a JSON array of all movies in one genre
  # to a json file in test/javascript/__fixtures__
  #
  # CMD:
  # > docker-compose run web rake fixtures:json['action']
  #
  desc 'Writes JSON array fixture for movies by genre'
  task :json, [:genre] => [:environment] do |_t, args|
    JSONFixture.create(args[:genre])
  end

  # docker-compose run web rake fixtures:yaml
  desc 'Write YAML fixtures for movies'
  task yaml: [:environment] do
    MovieFixtures.write
  end

  desc 'Build fixtures for people table'
  task people: [:environment] do
  end
end
