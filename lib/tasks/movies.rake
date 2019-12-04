# lib/tasks/movies.rake

# YAML.dump(hash, file_path)

namespace :movies do
  ##
  # Run this task with docker-compose:
  # > docker-compose run web rake movies:fetch[title]
  #
  desc 'Fetch movie data with OMDB API'
  task :fetch, [:title, :year] => [:environment] do |t, args|
    params = { t: args[:title] }
    params[:y] = args[:year] if args[:year]

    client = OmdbApi::Client.new
    data = client.fetch_movie(params)
    puts data.transform_keys(&:to_s)
  end

  ##
  # Run this task with docker-compose:
  # > docker-compose run web rake movies:fetch_all
  #
  desc 'Generate yaml data with OMDB API'
  task fetch_all: [:environment] do
    # Load list of movie titles
    puts 'Loading movies list...'
    list_file = Rails.root.join('db/yaml_data/new_movies_list.yml')
    list = YAML.load_file(list_file)

    # Initialize API client
    puts 'Initializing client...'
    client = OmdbApi::Client.new

    count = 0

    # Loop list and request data for each title
    # YAML.dump data into db/yaml_data/new_movies
    list.each do |title|
      puts "Fetching data for #{title}"
      params = { t: title }
      data = client.fetch_movie(params)

      if data[:Error]
        puts data
        next
      end

      count += 1

      file_name = title.gsub(/(\s-\s|:\s|\s)/, '-').downcase + '.yml'
      path = Rails.root.join("db/yaml_data/movies/#{file_name}")
      YAML.dump(data.stringify_keys, path)
    end

    puts "Successfully found data for #{count} movies"
  end
end
