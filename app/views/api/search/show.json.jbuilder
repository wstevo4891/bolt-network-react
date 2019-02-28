# app/views/search/show.json.jbuilder

json.genres do
  json.array! @results[:genres] do |genre|
    json.extract! genre, :id, :name
    json.url "/genres/#{genre.id}"
  end
end

json.movies do
  json.array! @results[:movies] do |movie|
    json.extract! movie, :id, :title, :photo, :year, :rated, :run_time, :plot
    json.url "/movies/#{movie.id}"
    json.genres movie.genres_list
  end
end