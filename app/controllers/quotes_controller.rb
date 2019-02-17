# app/controllers/quotes_controller.rb

# Quotes app controller
class QuotesController < PublicController
  layout 'demo'

  def index
    @first_quote_id = Quote.first.id
  end
end
