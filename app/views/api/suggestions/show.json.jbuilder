# app/views/search/show.json.jbuilder

json.genres do
  json.array! @results.genres do |genre|
    json.extract! genre, :alias
    # json.url "/genres/#{genre.slug}"
    json.suggestionId "#{genre.id}_genre"
  end
end

json.movies do
  json.array! @results.movies do |movie|
    json.extract! movie,
                  :id, :title, :slug, :photo,
                  :year, :rated, :run_time, :plot
    # json.url "/movies/#{movie.id}"
    json.genres movie.genres_list
    json.suggestionId "#{movie.id}_movie"
  end
end

json.people do
  json.array! @results.people do |person|
    json.extract! person, :name
    json.suggestionId "#{person.id}_person"
  end
end
