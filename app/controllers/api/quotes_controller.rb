# app/controllers/api/quotes_controller.rb
class Api::QuotesController < ApplicationController
  def show
    @quote = Quote.find(params[:id])
  end
end
