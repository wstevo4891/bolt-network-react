# app/views/api/genres/show.json.jbuilder

json.genre do
  json.extract! @results[:genre], :id, :name
  json.url genre_url(@results[:genre].id)
end

json.movies do
  json.array! @results[:movies] do |movie|
    json.extract! movie, :id, :title, :photo, :year, :rated, :run_time, :plot
    json.url movie_url(movie.id)
  end
end
