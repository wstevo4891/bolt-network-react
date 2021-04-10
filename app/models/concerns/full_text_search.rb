# frozen_string_literal: true

# Include PostgreSQL Full Text Search scope on a model
# NOTE: Must implement constant FULL_TEXT_SEARCH_SETTINGS
module FullTextSearch
  extend ActiveSupport::Concern

  included do
    include PgSearch::Model
    pg_search_scope :full_text_search, FULL_TEXT_SEARCH_SETTINGS
  end
end
