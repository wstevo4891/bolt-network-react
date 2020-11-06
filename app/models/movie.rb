# frozen_string_literal: true

# == Schema Information =======================================================
#
# Table: genres
#
# id            :integer
# title         :string
# slug          :string
# year          :integer
# rated         :string
# release_date  :string
# run_time      :string
# directors     :string    array: true, default: []
# writers       :string    array: true, default: []
# actors        :string    array: true, default: []
# plot          :string
# photo         :string
# banner        :string
# logo          :string
# poster        :string
# ratings       :json
# genres_list   :string    array: true, default: []
#
class Movie < ApplicationRecord
  # == Extensions =============================================================
  include PgSearch::Model

  # == Constants ==============================================================
  INDEX_LIMIT = 24

  SEARCH_LIMITS = {
    MULTI: 10,
    SINGLE: 30
  }.freeze

  # == Uploaders ==============================================================
  mount_uploader :photo, PhotoUploader

  mount_uploader :banner, PhotoUploader

  mount_uploader :logo, PhotoUploader

  # == Relationships ==========================================================
  has_and_belongs_to_many :genres

  has_and_belongs_to_many :people

  # == Validations ============================================================
  validates :title, :slug, :year, :rated, :run_time, :plot, presence: true

  # == Scopes =================================================================
  pg_search_scope :search_full_text,
                  against: %i[title genres_list directors writers actors],
                  using: %i[tsearch]

  scope :recent, -> { where('year > ?', 5.years.ago.year) }

  scope :lower_title, ->(query) { where('LOWER(title) LIKE ?', query) }

  # == Callbacks ==============================================================

  # == Class Methods ==========================================================
  def self.index_by_genre
    Rails.cache.fetch('movie.index_by_genre', expires_in: 1.hour) do
      Genre.includes(:movies).each_with_object({}) do |genre, hash|
        hash[genre.title] = genre.movies.take(INDEX_LIMIT)
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
    matches = <<-SQL
      array_to_string(directors, '||') LIKE :match
        OR array_to_string(writers, '||') LIKE :match
        OR array_to_string(actors, '||') LIKE :match
    SQL

    select(:directors, :writers, :actors).where(matches, match: "%#{query}%")
  end

  # def self.search(search)
  #   where('title ~* :search', search: "(#{search})")
  # end

  def self.lower_case_match(query)
    where(arel_table[:title].lower.matches("%#{query}%"))
  end

  def self.title_match(query, limit)
    lower_case_match(query).limit(limit)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.find_by_genres(genres)
    limit = genres.length > 1 ? SEARCH_LIMITS[:MULTI] : SEARCH_LIMITS[:SINGLE]

    genres.each_with_object([]) do |genre, array|
      array.concat(genre.movies.limit(limit))
    end
  end

  def self.find_by_association(records)
    return [] if records.empty?

    limit = records.length > 1 ? SEARCH_LIMITS[:MULTI] : SEARCH_LIMITS[:SINGLE]

    records.each_with_object([]) do |record, array|
      array.concat(record.movies.limit(limit))
    end
  end

  def self.titles(genre)
    joins(:genres).where(genres: { title: genre }).pluck(:title)
  end

  def self.search(query)
    match_title(query)
      .or(match_genre(query))
      .or(match_people(query))
      .select_search_columns
      .limit(SEARCH_LIMITS[:SINGLE])
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.select_search_columns
    select(:id, :title, :slug, :photo, :year, :rated, :run_time, :plot, :genres_list)
  end

  def self.match_title(query)
    lower_title("#{query}%").or(lower_title("%#{query}%"))
  end

  def self.match_genre(query)
    where("LOWER(array_to_string(genres_list, '||')) LIKE ?", "#{query}%")
  end

  def self.match_people(query)
    match_array_column(query, 'directors')
      .or(match_array_column(query, 'writers'))
      .or(match_array_column(query, 'actors'))
  end

  def self.match_array_column(query, column)
    where("LOWER(array_to_string(#{column}, '||')) LIKE ?", "%#{query}%")
  end

  def self.search_all_models(query)
    match = query.length > 1 ? "%#{query}%" : "#{query}%"

    search_by_title(match)
      .or(search_by_genre(match))
      .or(search_by_people(match))
      .limit(SEARCH_LIMITS[:SINGLE])
      .to_a
  end

  def self.search_by_title(match)
    includes(:genres, :people)
      .where('LOWER(movies.title) LIKE ?', match)
  end

  def self.search_by_genre(match)
    includes(:genres, :people)
      .where('LOWER(genres.title) LIKE ?', match)
      .references(:genres)
  end

  def self.search_by_people(match)
    includes(:genres, :people)
      .where('LOWER(people.name) LIKE ?', match)
      .references(:people)
  end

  def self.with_related_titles(id)
    includes(genres: [:movies]).find(id)
  end

  # == Instance Methods =======================================================
  # def people
  #   [directors, writers, actors].each_with_object([]) do |attr, arr|
  #     next if attr.nil?

  #     arr.concat(clean_strings(attr))
  #   end
  # end

  # def clean_strings(attribute)
  #   attribute.map { |attr| attr.sub(/\(.+\)/, '').strip }
  # end
end
