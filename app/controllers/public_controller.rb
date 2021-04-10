# frozen_string_literal: true

class PublicController < ApplicationController
  protect_from_forgery with: :exception
end
