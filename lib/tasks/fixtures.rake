# lib/tasks/fixtures.rake

namespace :fixtures do
  # docker-compose run web rake fixtures:create[genre]
  desc "Write JSON fixture for movies by genre"
  task :create, [:genre] => [:environment] do |t, args|
    file = Rails.root.join('test/javascript/fixtures', "#{args[:genre].downcase}.json")
    movies = Genre.where(name: args[:genre]).movies
    h = JSON.parse(movies.to_json)

    File.open(file, 'w+') do |f|
      f.write(JSON.pretty_generate(h))
    end
  end
end
