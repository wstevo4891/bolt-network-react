# app/models/subgenre.rb

# Subgenres class
class Subgenre < ApplicationRecord
  belongs_to :genre

  validates :name, presence: true
end
