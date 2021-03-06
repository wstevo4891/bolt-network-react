# frozen_string_literal: true

# Service for creating rows in credits table
class CreditCreator
  WRITER_REGEX = /(.+)\s\((.+)\)/.freeze

  attr_reader :movie

  def initialize(movie)
    @movie = movie
  end

  def create_credits(role, data_string)
    data_string.split(', ').each do |name|
      params = build_params(role, name)

      Credit.create!(params)
    end
  end

  private

  def build_params(role, name)
    {
      contribution: credit_contribution(role, name),
      movie_id: movie.id,
      person_id: find_person_id(role, name),
      role: role
    }
  end

  def credit_contribution(role, name)
    return nil unless role == MovieRoles::WRITER

    match = name.match(WRITER_REGEX)

    return nil unless match

    match[2]
  end

  def find_person_id(role, name)
    person = Person.find_or_create_by(role: role, name: name)

    return person.id if movie_has_person?(person.id)

    movie.people << person

    person.id
  end

  def movie_has_person?(id)
    movie.people.exists?(id: id)
  end
end
