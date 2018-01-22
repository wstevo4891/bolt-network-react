# app/controllers/api/movies_controller.rb

# Movies API
# Get Movie data as json
class Api::MoviesController < ApplicationController
  def index
    @movies = Movie.all
  end

  def show
    @movie = Movie.find(params[:id])
  end
end
