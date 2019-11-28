class QueryLabsController < ApplicationController
  def show
    @results = QueryLab.call
  end
end
