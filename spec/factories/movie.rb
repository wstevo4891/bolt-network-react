# frozen_string_literal: true

FactoryBot.define do
  factory :movie do
    sequence(:title) { |n| "Movie #{n}" }
    sequence(:slug)  { |n| "movie-#{n}" }
    year             { 2.years.ago.year }
    rated            { 'PG-13' }
    run_time         { '90 min' }
    plot             { 'Paragraph about movie plot details' }

    trait :with_genres do
      transient do
        genres_count { 3 }
      end

      after :create do |movie, evaluator|
        genres = create_list(:genre, evaluator.genres_count, movies: [movie])
        genres_list { genres.map(&:title) }
      end
    end

    factory :movie_with_genres, traits: [:with_genres]
  end
end
