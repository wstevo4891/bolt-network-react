# app/controllers/pages_controller.rb
class PagesController < ApplicationController
  def home
    @genres = Genre.all
  end

  def quotes
    @first_quote_id = Quote.first.id
  end

  def slider
  end

  private

  def access_data
    @genres = Genre.all
    @movies = Movie.all
  end
end
