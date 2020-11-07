# frozen_string_literal: true

# Module for interface with enum column: role
module MovieRoles
  extend ActiveSupport::Concern

  ROLES = {
    actor: 0,
    director: 1,
    writer: 2
  }.freeze

  included do
    enum role: ROLES

    validates :role, inclusion: {
      in: ROLES.values,
      message: "role: %{value} must be one of: #{ROLES.keys}"
    }

    scope :actors, -> { where(role: ROLES[:actor]) }

    scope :directors, -> { where(role: ROLES[:director]) }

    scope :writers, -> { where(role: ROLES[:writer]) }
  end
end
