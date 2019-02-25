# app/views/api/movies/recent/show.json.jbuilder

json.array!(@movies) do |movie|
  json.extract! movie, :id, :title, :photo, :logo, :year, :rated, :run_time, :plot

  json.url "/movies/#{movie.id}"
end
