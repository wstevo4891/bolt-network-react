# frozen_string_literal: true

FactoryBot.define do
  factory :credit do
    role { 0 }
    movie
    person
  end
end
