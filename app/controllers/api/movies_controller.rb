# frozen_string_literal: true

module Api
  # Movies API
  # Get Movie data as json
  class MoviesController < ApplicationController
    # GET /api/movies/:id
    def show
      @movie = Movie.includes(:people, :reviews).find(params[:id])
    end
  end
end
