# frozen_string_literal: true

json.movies do
  json.array! @results.movies do |movie|
    json.extract! movie, :id, :title, :slug, :photo, :year, :rating, :runtime, :plot

    json.genres movie.genres_list

    json.suggestionId "#{movie.id}_movie"

    json.url "/movies/#{movie.id}"
  end
end
