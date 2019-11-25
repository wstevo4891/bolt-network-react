# app/models/movie.rb

# Model for movies table
class Movie < ApplicationRecord
  # == Extensions ===========================================================
  include PgSearch

  # == Attributes ===========================================================
  # attr_accessor :genres_list

  mount_uploader :photo, PhotoUploader

  mount_uploader :banner, PhotoUploader

  mount_uploader :logo, PhotoUploader

  # == Relationships ========================================================
  has_and_belongs_to_many :genres

  # == Validations ==========================================================
  validates :title, :year, :rated, :run_time, :plot, presence: true

  # == Scopes ===============================================================
  pg_search_scope :search_by_title, against: :title, using: [:tsearch]

  # == Callbacks ============================================================
  # after_initialize do
  #   @genres_list = three_genres
  # end

  # == Class Methods ========================================================
  def self.search(search)
    where('title ~* :search', search: "(#{search})")
  end

  def self.find_by_genre(genre_id)
    Genre.find(genre_id).movies
  end

  def self.by_first_char(query)
    where('lower(title) LIKE :prefix', prefix: "#{query}%")
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.lower_case_match(query)
    where(arel_table[:title].lower.matches("%#{query}%"))
  end

  def self.title_match(query, limit)
    lower_case_match(query).limit(limit)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.titles(genre)
    joins(:genres).where(genres: { title: genre }).pluck(:title)
  end

  # == Instance Methods =====================================================
  # def three_genres
  #   genres.limit(3).pluck(:name)
  # end
end
