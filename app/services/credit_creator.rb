# frozen_string_literal: true

# Service for creating rows in credits table
class CreditCreator
  WRITER_REGEX = /(.+)\s\((.+)\)/.freeze

  def initialize(movie)
    @movie = movie
  end

  def create_credits(role, data_string)
    @role = role

    if @role == MovieRoles::WRITER
      create_writer_credits(data_string)
    else
      create_default_credits(data_string)
    end
  end

  private

  def create_default_credits(data_string)
    data_string.split(', ').each do |name|
      create_with_name(name)
    end
  end

  def create_writer_credits(data_string)
    data_string.split(', ').each do |name|
      match = name.match(WRITER_REGEX)

      return create_with_name(name) unless match

      create_with_match(match)
    end
  end

  def create_with_name(name)
    person = find_person(name)

    Credit.create!(
      role: @role,
      movie_id: @movie.id,
      person_id: person.id
    )
  end

  def create_with_match(match)
    person_id = find_person(match[1]).id

    Credit.create!(
      contribution: match[2],
      role: @role,
      movie_id: @movie.id,
      person_id: person_id
    )
  end

  def find_person(name)
    person = Person.find_or_create_by(role: @role, name: name)

    puts "person: #{person.name}, role: #{person.role}"

    return person if @movie.people.exists?(id: person.id)

    @movie.people << person

    person
  end
end
