# app/views/api/genres/show.json.jbuilder

json.genre do
  json.extract! @results[:genre], :id, :name
  json.url "/genres/#{@results[:genre].id}"
end

json.movies do
  json.array! @results[:movies] do |movie|
    json.extract! movie, :id, :title, :photo, :year, :rated, :run_time, :plot
    json.url "/movies/#{movie.id}"
    json.genres movie.genres_list
  end
end
