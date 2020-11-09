# frozen_string_literal: true

json.array!(@movies) do |movie|
  json.extract! movie, :id, :year, :rating, :runtime, :plot, :banner, :logo

  json.url "/movies/#{movie.id}"
end
