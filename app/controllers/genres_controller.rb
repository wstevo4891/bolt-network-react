# app/controllers/genres_controller.rb

# Controller for showing genre pages
class GenresController < ApplicationController
  def show
    @genre = Genre.find(params[:id])
  end
end
