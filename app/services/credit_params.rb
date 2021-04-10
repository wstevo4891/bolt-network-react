# frozen_string_literal: true

# Service for building credit params hash
class CreditParams
  WRITER_REGEX = /(.+)\s\((.+)\)/.freeze

  attr_reader :movie, :name, :role, :value

  def self.build(movie, role, name)
    new(movie, role, name).value
  end

  def initialize(movie, role, name)
    @movie = movie
    @role = role
    @name = name
    @value = build_params
  end

  private

  def build_params
    {
      contribution: credit_contribution,
      movie_id: movie.id,
      person_id: find_person_id,
      role: role
    }
  end

  def credit_contribution
    return nil unless role == MovieRoles::WRITER

    match = name.match(WRITER_REGEX)

    return nil unless match

    match[2]
  end

  def find_person_id
    person = Person.find_or_create_by(role: role, name: name)

    return person.id if movie_has_person?(person.id)

    movie.people << person

    person.id
  end

  def movie_has_person?(id)
    movie.people.exists?(id: id)
  end
end
