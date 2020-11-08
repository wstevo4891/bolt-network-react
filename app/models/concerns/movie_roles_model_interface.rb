# frozen_string_literal: true

# Module for interface with enum column: role
module MovieRolesModelInterface
  extend ActiveSupport::Concern

  include MovieRoles

  ROLE_VALUES = ROLES.keys.map(&:to_s)

  included do
    enum role: ROLES

    validates :role, inclusion: {
      in: ROLE_VALUES,
      message: "%{value} must be one of: #{ROLE_VALUES}"
    }

    scope :actors, -> { where(role: ROLES[:actor]) }

    scope :directors, -> { where(role: ROLES[:director]) }

    scope :writers, -> { where(role: ROLES[:writer]) }
  end
end
