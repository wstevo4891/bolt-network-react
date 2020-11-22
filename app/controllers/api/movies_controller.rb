# frozen_string_literal: true

module Api
  # Movies API
  # Get Movie data as json
  class MoviesController < ApplicationController
    # GET /api/movies/:id
    def show
      @presenter = MoviePresenter.new(Movie.find(params[:id]))
    end
  end
end
