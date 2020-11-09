# frozen_string_literal: true

json.extract! @movie, :id, :title, :poster, :rating, :runtime, :plot

json.actors do
  json.array!(@movie.actors) do |actor|
    json.extract! actor, :id, :name
  end
end

json.directors do
  json.array!(@movie.directors) do |director|
    json.extract! director, :id, :name
  end
end

json.genres @movie.genres_list

json.release_date @movie.formatted_release_date

json.reviews do
  json.array!(@movie.reviews) do |review|
    json.extract! review, :id, :source, :value
  end
end

json.url "/movies/#{@movie.id}"

json.writers do
  json.array!(@movie.writers) do |writer|
    json.extract! writer, :id, :name
  end
end

json.year @movie.year.to_s
