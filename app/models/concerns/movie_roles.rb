# frozen_string_literal: true

# Module for movie role constants.
# Adds an enum column with scopes.
module MovieRoles
  ACTOR = 0
  DIRECTOR = 1
  WRITER = 2

  ROLE_TYPES = %w[actor director writer].freeze

  extend ActiveSupport::Concern

  included do
    enum role: {
      actor: ACTOR,
      director: DIRECTOR,
      writer: WRITER
    }

    validates :role, inclusion: {
      in: ROLE_TYPES,
      message: "%{value} must be one of: #{ROLE_TYPES}"
    }

    scope :actors, -> { where(role: ACTOR) }

    scope :directors, -> { where(role: DIRECTOR) }

    scope :writers, -> { where(role: WRITER) }
  end
end
