# app/controllers/home_controller.rb

# Home page controller
class HomeController < ApplicationController
  def index
    @genres = Genre.all
  end
end
