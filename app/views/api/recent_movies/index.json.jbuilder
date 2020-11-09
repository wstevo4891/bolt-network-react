# frozen_string_literal: true

json.array!(@movies) do |movie|
  json.extract! movie, :id, :title, :photo, :rating, :runtime

  json.genres movie.genres_list

  json.url "/movies/#{movie.id}"
end
