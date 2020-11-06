# frozen_string_literal: true

FactoryBot.define do
  factory :genre do
    sequence(:title) { |n| "Genre #{n}" }
    sequence(:slug)  { |n| "genre-#{n}" }
    sequence(:alias) { |n| "Genre #{n} Movies" }

    factory :genre_with_movies do
      transient do
        movies_count { 5 }
      end

      after :create do |genre, evaluator|
        create_list(:movie, evaluator.movies_count, genres: [genre])
      end
    end
  end
end
