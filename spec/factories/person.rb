# frozen_string_literal: true

FactoryBot.define do
  factory :person do
    sequence(:name) { |n| "Person #{n}" }

    factory :actor do
      role { 'actor' }
    end

    factory :director do
      role { 'director' }
    end

    factory :writer do
      role { 'writer' }
    end

    trait :with_movies do
      transient do
        movies_count { 3 }
      end

      after :create do |person, evaluator|
        create_list(:movie, evaluator.movies_count, people: [person])
      end
    end
  end
end
