# app/models/movie.rb

# Model for movies table
class Movie < ApplicationRecord
  # == Extensions ===========================================================
  include PgSearch::Model

  # == Attributes ===========================================================
  # t.string   :title
  # t.string   :slug
  # t.integer  :year
  # t.string   :rated
  # t.string   :release_date
  # t.string   :run_time
  # t.string   :directors, array: true, default: []
  # t.string   :writers, array: true, default: []
  # t.string   :actors, array: true, default: []
  # t.string   :plot
  # t.string   :photo
  # t.string   :banner
  # t.string   :logo
  # t.string   :poster
  # t.json     :ratings
  # t.string   :genres_list, array: true, default: []

  mount_uploader :photo, PhotoUploader

  mount_uploader :banner, PhotoUploader

  mount_uploader :logo, PhotoUploader

  # == Relationships ========================================================
  has_and_belongs_to_many :genres

  # == Validations ==========================================================
  validates :title, :year, :rated, :run_time, :plot, presence: true

  # == Scopes ===============================================================
  pg_search_scope :search_by_title, against: :title, using: [:tsearch]

  scope :recent, -> { where('year > ?', 5.years.ago.year) }

  # == Callbacks ============================================================

  # == Class Methods ========================================================
  ##
  # self.index_by_genre()
  #   Create a hash with Genre titles as keys and arrays of
  #   movie records as values.
  #
  # @returns {Hash<Array>}
  #
  def self.index_by_genre
    # Cache this expensive lookup to improve performance
    Rails.cache.fetch('movies_index_by_genre', expires_in: 12.hours) do
      Genre.all.each_with_object({}) do |genre, hash|
        hash[genre.title] = genre.movies.limit(24)
      end
    end
  end

  def self.find_by_genre(genre_id)
    Genre.find(genre_id).movies
  end

  def self.by_first_char(query)
    where('lower(title) LIKE :prefix', prefix: "#{query}%")
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.find_people(query)
    likes = <<-SQL
      array_to_string(directors, '||') LIKE :match
        OR array_to_string(writers, '||') LIKE :match
        OR array_to_string(actors, '||') LIKE :match
    SQL

    select(:directors, :writers, :actors).where(likes, match: "%#{query}%")
  end

  def self.search(search)
    where('title ~* :search', search: "(#{search})")
  end

  def self.lower_case_match(query)
    where(arel_table[:title].lower.matches("%#{query}%"))
  end

  def self.title_match(query, limit)
    lower_case_match(query).limit(limit)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.find_by_genres(genres)
    limit = genres.length > 1 ? 5 : 20

    genres.each_with_object([]) do |genre, array|
      array.concat(genre.movies.limit(limit))
    end
  end

  def self.titles(genre)
    joins(:genres).where(genres: { title: genre }).pluck(:title)
  end

  # == Instance Methods =======================================================
  def people
    [directors, writers, actors].each_with_object([]) do |attr, arr|
      next if attr.nil?

      arr.concat(clean_strings(attr))
    end
  end

  def clean_strings(attribute)
    attribute.map { |attr| attr.sub(/\(.+\)/, '').strip }
  end
end
