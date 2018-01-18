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

puts 'Seeding the Database ==================================='

quotes = YAML.load_file(Rails.root.join('db/yaml_data/quotes.yml'))

puts 'Delete old quotes ===================================='
Quote.delete_all

Quote.create!(quotes)
puts 'Quotes seeded!'

puts 'Delete old Genres ===================================='
Genre.delete_all

puts 'Loading Genres YAML ==================================='
genres = YAML.load_file(Rails.root.join('db/yaml_data/genres.yml'))

puts 'Creating Genres ==================================='
genres.each do |genre|
  puts "Creating genre: #{genre}"
  Genre.create!(name: genre)
end

puts 'Delete old Movies ================================='
# Movie.delete_all

puts 'Loading Movies YAML ==================================='
movies = YAML.load_file(Rails.root.join('db/yaml_data/movies.yml'))

puts 'Creating Movies ==================================='
movies.each do |movie|
  puts "Creating movie: #{movie['title']}\n"
  Movie.create!(
    title: movie['title'],
    remote_photo_url: seed_image(movie['image']),
    year: movie['year'],
    rating: movie['rating'],
    length: movie['length'],
    summary: movie['summary'],
    tomato_meter: movie['tomato_meter'],
    genre_ids: movie['genre_ids']
  )
end
