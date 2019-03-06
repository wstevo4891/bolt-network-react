# app/models/genre.rb

# Class for movie genres
class Genre < ApplicationRecord
  # == Constants ============================================================

  # == Attributes ===========================================================
  # +name+:: String
  # +plural:: String
  # +category+:: String

  # == Extensions ===========================================================
  include PgSearch

  # == Relationships ========================================================
  has_and_belongs_to_many :movies
  has_many :subgenres

  # == Validations ==========================================================
  validates :name, :plural, :category, presence: true

  # == Scopes ===============================================================
  pg_search_scope :full_text_search, against: %i[name plural category], using: [:tsearch]

  # == Callbacks ============================================================

  # == Class Methods ========================================================
  def self.by_first_char(query)
    where('lower(name) LIKE :prefix', prefix: "#{query}%")
  end

  def self.lower_case_match(query)
    where(Genre.arel_table[:name].lower.matches("%#{query}%"))
  end

  # == Instance Methods =====================================================
end
