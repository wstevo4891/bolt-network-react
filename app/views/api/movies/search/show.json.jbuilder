# app/views/api/movies/search/show.json.jbuilder

json.array!(@movies) do |movie|
  json.extract! movie, :id, :title, :photo, :logo, :year, :rated, :run_time, :plot

  json.url "/movies/#{movie.id}"
end
