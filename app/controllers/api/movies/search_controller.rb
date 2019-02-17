# app/controllers/api/movies/search_controller.rb

module Api
  module Movies
    # API movies search controller
    class SearchController < ApplicationController
      skip_before_action :verify_authenticity_token

      def show
        @movies = Movie.where(title: params[:titles])
      end
    end
  end
end
