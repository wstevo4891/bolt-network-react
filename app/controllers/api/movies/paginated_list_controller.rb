# frozen_string_literal: true

module Api
  module Movies
    ##
    # API for paginated lists of movies
    #
    class PaginatedListController < ApiController
      ##
      # GET /api/movies/paginated-list/:genre_id/:size/:page
      def show
        @movies = PaginatedList.fetch(paginated_list_params)
      end

      private

      def paginated_list_params
        params.permit(:genre_id, :size, :page)
      end
    end
  end
end
