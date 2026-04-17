# frozen_string_literal: true

# # Table: genres
# =============================
#
# - id          :integer     not null, primary key
# - title       :string      not null
# - slug        :string      not null
# - alias       :string      not null
# - created_at  :datetime    not null
# - updated_at  :datetime    not null
#
# ## Join Table: genres_movies
# =============================
#
# - genre_id  :integer
# - movie_id  :integer
#
# ## Indices
# =============================
#
# - index_genre_id  (genre_id)
# - index_movie_id  (movie_id)
#
# =============================
class Genre < ApplicationRecord
  # == Constants ==============================================================
  FULL_TEXT_SEARCH_SETTINGS = {
    against: %i[title alias],
    using: %i[tsearch]
  }.freeze

  MOVIE = 'Movie'

  SEARCH_LIMIT = 10

  # == Extensions =============================================================
  include PgSearch::Model
  include TitleSearch

  # == Relationships ==========================================================
  belongs_to :parent, class_name: name

  has_many :sub_genres, class_name: name

  has_and_belongs_to_many :movies

  has_many :index_movies,
           -> { select(*Movie::BASE_COLUMNS) },
           class_name: MOVIE

  has_many :search_movies,
           -> { select(*Movie::SEARCH_COLUMNS) },
           class_name: MOVIE

  # == Validations ============================================================
  validates :title, :slug, :alias, presence: true

  # == Scopes =================================================================
  pg_search_scope :full_text_search, FULL_TEXT_SEARCH_SETTINGS

  scope :with_movies, -> { includes(:movies) }

  # == Class Methods ==========================================================
  def self.search(query)
    select(:id, :alias).match_query(query).limit(SEARCH_LIMIT)
  rescue ActiveRecord::RecordNotFound
    []
  end

  def self.match_query(query)
    match_title(query).or(match_alias(query))
  end

  def match_alias(query)
    where('LOWER(alias) LIKE ?', "#{query}%")
  end
end
