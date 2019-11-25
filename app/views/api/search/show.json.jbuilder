# app/views/search/show.json.jbuilder

json.genres do
  json.array! @results[:genres] do |genre|
    json.extract! genre, :id, :title, :slug
    json.url "/genres/#{genre.slug}"
  end
end

json.movies do
  json.array! @results[:movies] do |movie|
    json.extract! movie,
                  :id, :title, :slug, :photo,
                  :year, :rated, :run_time, :plot
    json.url "/movies/#{movie.id}"
    json.genres movie.genres_list
  end
end
