# frozen_string_literal: true

module MovieRoles
  # Interface for Movie Roles enum column with scopes
  module Interface
    extend ActiveSupport::Concern

    ROLE_TYPES = %w[actor director writer].freeze

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
end
