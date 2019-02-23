# lib/tasks/fixtures.rake

# YAML.dump(hash, file_path)

namespace :fixtures do
  # docker-compose run web rake fixtures:create[genre]
  desc "Write JSON fixture for movies by genre"
  task :json, [:genre] => [:environment] do |t, args|
    file = Rails.root.join('test/javascript/fixtures', "#{args[:genre].downcase}.json")
    puts "file: #{file}"

    puts 'Loading movies =================================='
    movies = Genre.where(name: args[:genre]).first.movies
    puts movies.first.inspect

    h = JSON.parse(movies.to_json)

    File.open(file, 'w+') do |f|
      f.write(JSON.pretty_generate(h))
    end
  end

  # docker-compose run web rake fixtures:yaml
  desc "Write YAML fixtures for movies"
  task yaml: [:environment] do
    file = Rails.root.join('test/fixtures/movies.yml')
    puts "file: #{file}"

    puts 'Loading movies =================================='
    rejects = ['id', 'created_at', 'updated_at']
    movies = Movie.all.map do |movie|
      genres = Genre.find(movie.genre_ids).map(&:name).join(', ')
      g = { 'genres' => genres }
      movie.attributes.reject { |k,v| rejects.include?(k) }.merge(g)
    end

    puts 'Building Hash for YAML =========================='
    data = {}
    movies.each_with_index do |movie, index|
      data_key = (index + 1).humanize
      puts "data_key: #{data_key}"

      data[data_key] = movie
    end

    puts 'Writing Fixtures ================================'
    File.open(file, 'w') { |f| f.write data.to_yaml }
  end
end
