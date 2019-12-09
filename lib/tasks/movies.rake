# lib/tasks/movies.rake

require 'services/movies_yaml'

# YAML.dump(hash, file_path)

namespace :movies do
  ##
  # movies:fetch
  # ===================================
  # Test ability to fetch movies with OMDB API Client
  #
  # Run this task with docker-compose:
  # > docker-compose run web rake movies:fetch[<title>]
  #
  desc 'Fetch movie data with OMDB API'
  task :fetch, %i[title year] => [:environment] do |_t, args|
    params = { t: args[:title] }
    params[:y] = args[:year] if args[:year]

    client = OmdbApi::Client.new
    data = client.fetch_movie(params)
    puts data.transform_keys(&:to_s)
  end

  ##
  # movies:fetch_all
  # ===================================
  # Fetch movie data with each title in new_movies_list.yml
  # Write each object to YAML in db/yaml_data/movies
  #
  # Run this task with docker-compose:
  # > docker-compose run web rake movies:fetch_all
  #
  desc 'Generate yaml data with OMDB API'
  task fetch_all: [:environment] do
    puts 'Generating new movies YAML...'
    puts 'Loading movies list...'
    MoviesYAML.write
  end
end
