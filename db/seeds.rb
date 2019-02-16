# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def seed_image(file_name)
  "https://s3-us-west-2.amazonaws.com/bolt-network/#{file_name}"
end

def load_yaml(file)
  YAML.load_file(Rails.root.join("db/yaml_data/#{file}.yml"))
end

def load_movie(path)
  YAML.load_file(Rails.root.join(path))
end

def genre_ids_map
  {
    'Action' => 1,
    'Adventure' => 2,
    'Comedy' => 3,
    'Drama' => 4,
    'Animation' => 5,
    'Family' => 6,
    'Romance' => 7,
    'Fantasy' => 8,
    'Sci-Fi' => 9,
    'Horror' => 10
  }
end

def genre_ids_array(genres)
  arr = genres.split(', ')

  arr.map { |name| genre_ids_map[name] }
end

puts 'Seeding the Database =========================================='

quotes = load_yaml('quotes')

puts 'Delete old quotes ============================================='
Quote.delete_all

Quote.create!(quotes)
puts 'Quotes seeded!'

puts 'Delete old Genres ============================================='
Genre.delete_all

puts 'Loading Genres YAML ==========================================='
genres = load_yaml('genres')

puts 'Creating Genres ==============================================='
genres.each do |genre|
  puts "Creating genre: #{genre}"

  Genre.create!(name: genre)
end

puts 'Delete old Movies ============================================='
Movie.delete_all

puts 'Loading Movies ================================================'
Dir['db/yaml_data/movies/*.yml'].each do |path|
  movie = load_movie(path)
  poster_file = path[/\/[\w-]+\.yml/].slice(1..-1).sub('.yml', '-poster.jpg')
  puts "poster_file: #{poster_file}"

  Movie.create!(
    title: movie['Title'],
    year: movie['Year'],
    rated: movie['Rated'],
    release_date: movie['Released'],
    run_time: movie['Runtime'],
    directors: movie['Director'].split(', '),
    writers: movie['Writer'].split(', '),
    actors: movie['Actors'].split(', '),
    plot: movie['Plot'],
    remote_photo_url: seed_image(poster_file),
    poster: movie['Poster'],
    ratings: { ratings: movie['Ratings'] },
    genre_ids: genre_ids_array(movie['Genre'])
  )

  puts "Created Movie: #{movie['Title']}"
end

# puts 'Loading Movies YAML ==================================='
# movies = load_yaml('movies')

# puts 'Creating Movies ==================================='
# movies.each do |movie|
#   puts "Creating movie: #{movie['title']}\n"

#   Movie.create!(
#     title: movie['title'],
#     remote_photo_url: seed_image(movie['image']),
#     year: movie['year'],
#     rating: movie['rating'],
#     length: movie['length'],
#     summary: movie['summary'],
#     tomato_meter: movie['tomato_meter'],
#     genre_ids: movie['genre_ids']
#   )
# end
