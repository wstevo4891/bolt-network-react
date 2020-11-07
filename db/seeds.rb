# frozen_string_literal: true

# This file should contain all the record creation needed
# to seed the database with its default values.

# The data can then be loaded with the rails db:seed command
# (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def load_yaml(file)
  YAML.load_file(Rails.root.join("db/yaml_data/#{file}.yml"))
end

puts 'Seeding the Database...'

# Genres
# =============================================================================

puts 'Deleting old Genres...'
Genre.delete_all

puts 'Loading Genres YAML...'
genres = load_yaml('genres')

puts 'Creating Genres...'
genres.each do |genre|
  Genre.create!(genre)

  puts "Created genre: #{genre['title']}"
end

puts 'Genres created!'

# Movies, Reviews, People & Credits
# =============================================================================

puts 'Deleting old People...lul'
Person.delete_all

puts 'Deleting old Movies...'
Movie.delete_all

puts 'Loading Movies...'

Dir['db/yaml_data/movies/*.yml'].each do |path|
  creator = MovieCreator.new(path)

  creator.create_movie

  puts "Created Movie: #{creator.title}"

  puts 'Creating reviews...'

  creator.create_reviews

  puts "Reviews created for #{creator.title}!"

  puts 'Creating people and credits...'

  creator.create_credits
end

puts 'Movies Created!'

# People
# =============================================================================

# puts 'Deleting old People...lul'
# Person.delete_all

# puts 'Loading all the peeps...'
# people = load_yaml('people')

# puts 'Let there be people...'
# people.each do |data|
#   Person.create!(data)

#   puts "Created person: #{data['name']}"
# end

# puts 'Created people like God!'

# puts 'Seeding Database Complete!'
