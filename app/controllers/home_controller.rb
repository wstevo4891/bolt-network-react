# app/controllers/home_controller.rb

# Home page controller
class HomeController < PublicController
  def index
    @genres = Genre.all
  end
end
