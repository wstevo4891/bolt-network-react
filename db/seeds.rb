# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

GENRE_IDS_MAP = {
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
}.freeze

def genre_ids_array(genres)
  arr = genres.split(', ')

  arr.map { |name| GENRE_IDS_MAP[name] }
end

def image_url(file)
  "https://bolt-network.s3-us-west-2.amazonaws.com/#{file}"
end

def poster_file(path)
  path[%r{/[\w-]+\.yml}].slice(1..-1).sub('.yml', '-poster.jpg')
end

def movie_slug(path)
  path[%r{/[\w-]+\.yml}].slice(1..-5)
end

def load_yaml(file)
  YAML.load_file(Rails.root.join("db/yaml_data/#{file}.yml"))
end

def load_movie(path)
  YAML.load_file(Rails.root.join(path))
end

def genres_short_list(genres)
  genres.split(', ').take(3)
end

def movie_params(movie, poster_file)
  {
    title: movie['Title'],
    year: movie['Year'],
    rated: movie['Rated'],
    release_date: movie['Released'],
    run_time: movie['Runtime'],
    directors: movie['Director'].split(', '),
    writers: movie['Writer'].split(', '),
    actors: movie['Actors'].split(', '),
    plot: movie['Plot'],
    remote_photo_url: image_url(poster_file),
    poster: movie['Poster'],
    ratings: { ratings: movie['Ratings'] },
    genres_list: genres_short_list(movie['Genre']),
    genre_ids: genre_ids_array(movie['Genre'])
  }
end

puts 'Seeding the Database...'

# GENRES
# =============================================================================

puts 'Delete old Genres...'
Genre.delete_all

puts 'Loading Genres YAML...'
genres = load_yaml('genres')

puts 'Creating Genres...'
genres.each do |genre|
  puts "Creating genre: #{genre['name']}"

  Genre.create!(genre)
end

puts 'Genres created!'

# MOVIES
# =============================================================================

puts 'Delete old Movies...'
Movie.delete_all

puts 'Loading Movies...'

Dir['db/yaml_data/movies/*.yml'].each do |path|
  movie = load_movie(path)
  poster_file = poster_file(path)

  params = movie_params(movie, poster_file)
  params[:slug] = movie_slug(path)
  params[:remote_banner_url] = image_url(movie['Banner']) if movie['Banner']
  params[:remote_logo_url] = image_url(movie['Logo']) if movie['Logo']

  Movie.create!(params)

  puts "Created Movie: #{movie['Title']}"
end

puts 'Movies Created!'

puts 'Seeding Database Complete!'
