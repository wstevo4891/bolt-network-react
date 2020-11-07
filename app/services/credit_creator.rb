# frozen_string_literal: true

# Service for creating rows in credits table
class CreditCreator
  WRITER_REGEX = /([\w\s]+)\s\(([\w\s]+)\)/.freeze

  def initialize(movie)
    @movie = movie
  end

  def create_credits(role, data_string)
    @role = role

    if @role == MovieRoles::Roles[:writer]
      create_writer_credits(data_string)
    else
      create_default_credits(data_string)
    end
  end

  private

  def create_default_credits(data_string)
    data_string.split(', ').each do |name|
      person = find_person(name)

      Credit.create!(
        role: @role,
        movie_id: @movie.id,
        person_id: person.id
      )
    end
  end

  def create_writer_credits(data_string)
    data_string.split(', ').each do |name|
      match = name.match(WRITER_REGEX)

      person = find_person(match[1])

      Credit.create!(
        contribution: match[2],
        role: @role,
        movie_id: @movie.id,
        person_id: person.id
      )
    end
  end

  def find_person(name)
    person = Person.find_or_create_by(role: @role, name: name)

    return person if @movie.people.exists?(person_id: person.id)

    @movie.people << person

    person
  end
end
