# app/views/api/genres/show.json.jbuilder

json.genre do
  json.extract! @results[:genre], :id, :title, :slug
  json.url "/genres/#{@results[:genre].slug}"
end

json.movies do
  json.array! @results[:movies] do |movie|
    json.extract! movie, :id, :title, :slug, :photo,
                  :year, :rated, :run_time, :plot
    json.url "/movies/#{movie.id}"
    json.genres movie.genres_list
  end
end
