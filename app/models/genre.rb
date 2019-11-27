# app/models/genre.rb

# Class for movie genres
class Genre < ApplicationRecord
  # == Extensions ===========================================================
  include PgSearch::Model

  # == Attributes ===========================================================
  # title     {String}
  # slug      {String}
  # plural    {String}
  # category  {String}

  # == Relationships ========================================================
  has_and_belongs_to_many :movies
  has_many :subgenres

  # == Validations ==========================================================
  validates :title, :plural, :category, presence: true

  # == Scopes ===============================================================
  pg_search_scope :full_text_search,
                  against: %i[title plural category],
                  using: [:tsearch]

  # == Class Methods ========================================================
  def self.by_first_char(query)
    where('lower(title) LIKE :prefix', prefix: "#{query}%")
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.lower_case_match(query)
    where(arel_table[:title].lower.matches("%#{query}%"))
  end

  def self.title_match(query)
    genres = lower_case_match(query)

    return genres unless genres.empty?

    full_text_search(query)
  rescue ActiveRecord::RecordNotFound
    []
  end
end
