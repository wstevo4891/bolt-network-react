# frozen_string_literal: true

module Api
  module Movies
    # # Query: PaginatedList
    # =====================
    #
    # - Fetches a paginated list of movies.
    # - Page offsets are determined by the @size param
    #
    # =====================
    class PaginatedList
      LIMIT_MULTIPLIER = 3

      attr_reader :genre_id, :limit, :offset

      def self.fetch(genre_id, size, page)
        new(genre_id, size, page).call
      end

      def initialize(genre_id: 1, size: 6, page: 0)
        @genre_id = genre_id
        @limit = size * LIMIT_MULTIPLIER
        @offset = page_offset(size, page)
      end

      def call
        Movie.find_by_genre(genre_id).offset(offset).limit(limit)
      end

      private

      def page_offset(size, page)
        return 0 if page == 1

        size * page
      end
    end
  end
end
