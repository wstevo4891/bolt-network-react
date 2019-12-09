# frozen_string_literal: true

# Service for writing movies yaml for seeding
class MoviesYAML
  NEW_MOVIES_FILE = Rails.root.join('db/yaml_data/new_movies_list.yml')

  def self.write
    new.call
  end

  def initialize
    @list = YAML.load_file(NEW_MOVIES_FILE)
    @client = OmdbApi::Client.new
    @count = 0
  end

  def call
    write_yaml
  end

  private

  def write_yaml
    # Loop list and request data for each title
    @list.each do |title|
      data = fetch_movie(title)

      next if data[:Error]

      @count += 1

      puts 'Writing data to yaml...'
      path = path_for(title)
      YAML.dump(data.stringify_keys, path)
    end

    puts 'Movies YAML written!'

    puts "Successfully found data for #{@count} movies"
  end

  def fetch_movie(title)
    puts "Fetching data for #{title}"

    data = @client.fetch_movie(t: title)

    puts data if data[:Error]

    data
  end

  def path_for(title)
    file = title.gsub(/(\s-\s|:\s|\s)/, '-').downcase + '.yml'

    Rails.root.join("db/yaml_data/movies/#{file}")
  end
end
