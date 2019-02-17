# app/controllers/public_controller.rb

class PublicController < ApplicationController
  protect_from_forgery with: :exception
end
