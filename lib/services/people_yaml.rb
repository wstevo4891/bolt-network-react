# frozen_string_literal: true

require 'set'

# Service for generating seed yaml for people table
class PeopleYAML
  YAML_FILE = Rails.root.join('db/yaml_data/people.yml')

  def self.write
    new.call
  end

  def initialize
    @movies = Movie.select(:id, :directors, :writers, :actors)
  end

  def call
    write_people_yaml
  end

  private

  def write_people_yaml
    puts 'Building people hash...'
    people = people_list

    puts 'Writing to yaml...'
    File.open(YAML_FILE, 'w') { |f| f.write people.to_yaml }

    puts 'people.yml written!'
  end

  def people_list
    data = people_hash.values

    data.each do |hash|
      hash['movie_ids'] = hash['movie_ids'].to_a
    end
  end

  def people_hash
    @movies.each_with_object({}) do |movie, hash|
      %i[directors writers actors].each do |attr|
        people_hash = people_hash_for(attr, movie)

        people_hash.each do |key, value|
          if hash[key]
            hash[key]['movie_ids'].add(movie.id)
          else
            hash[key] = value
          end
        end
      end
    end
  end

  def people_hash_for(attr, movie)
    names = clean_strings(movie.send(attr))

    names.each_with_object({}) do |name, hash|
      hash[name] = {
        'name' => name,
        'role' => attr.to_s.singularize,
        'movie_ids' => Set[movie.id]
      }
    end
  end

  def clean_strings(attribute)
    attribute.map { |attr| attr.sub(/\(.+\)/, '').strip }
  end
end
