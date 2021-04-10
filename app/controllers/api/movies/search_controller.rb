# frozen_string_literal: true

module Api
  module Movies
    # API movies search controller
    class SearchController < ApplicationController
      # POST /api/movies/search
      def show
        @movies = Movie.where(title: params[:titles])
      end
    end
  end
end
