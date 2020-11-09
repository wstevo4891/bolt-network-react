# frozen_string_literal: true

json.genres do
  json.array! @results.genres do |genre|
    json.extract! genre, :alias

    json.suggestionId "#{genre.id}_genre"

    json.url "/genres/#{genre.slug}"
  end
end

json.movies do
  json.array! @results.movies do |movie|
    json.extract! movie, :id, :title, :slug, :photo, :year, :rating, :runtime, :plot

    json.genres movie.genres_list

    json.suggestionId "#{movie.id}_movie"

    json.url "/movies/#{movie.id}"
  end
end

json.people do
  json.array! @results.people do |person|
    json.extract! person, :name

    json.suggestionId "#{person.id}_person"
  end
end
