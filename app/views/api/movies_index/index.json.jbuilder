# frozen_string_literal: true

@movies_index.each do |genre, movies_list|
  json.set! genre do
    json.array! movies_list do |movie|
      json.extract! movie, :id, :title, :photo, :rating, :runtime

      json.genres movie.genres_list

      json.url "/movies/#{movie.id}"
    end
  end
end
