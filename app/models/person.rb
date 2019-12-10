# Person Model

class Person < ApplicationRecord
  # == Extensions =============================================================

  # == Attributes =============================================================
  # t.string   :name
  # t.string   :role

  # == Relationships ==========================================================
  has_and_belongs_to_many :movies

  # == Validations ============================================================
  validates :name, :role, presence: true

  # == Scopes =================================================================

  # == Callbacks ==============================================================

  # == Class Methods ==========================================================
  def self.search(query)
    return [] unless query.length > 3

    select(:id, :name).match_name(query).limit(5)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.match_name(query)
    match = query.length > 3 ? "%#{query}%" : "#{query}%"

    where('LOWER(name) LIKE ?', match)
  end

  # == Instance Methods =======================================================
end
