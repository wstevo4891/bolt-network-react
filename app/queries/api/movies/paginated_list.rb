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

      attr_reader :genre_id, :size, :page, :limit, :offset

      def self.fetch(genre_id, size, page)
        new(genre_id, size, page).call
      end

      def initialize(params)
        @genre_id = params[:genre_id]
        @size = params[:size]
        @page = params[:page]
        @limit = size * LIMIT_MULTIPLIER
        @offset = page_offset
      end

      def call
        Movie.find_by_genre(genre_id).offset(offset).limit(limit)
      end

      private

      def page_offset
        return 0 if page == 1

        size * page
      end
    end
  end
end
