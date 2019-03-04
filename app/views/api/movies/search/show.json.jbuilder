# app/views/api/movies/search/show.json.jbuilder

json.array!(@movies) do |movie|
  json.extract! movie, :id, :title, :poster, :photo, :year, :rated,
                :run_time, :plot, :ratings, :release_date, :directors,
                :writers, :actors, :logo

  json.url "/movies/#{movie.id}"

  json.genres movie.genres_list
end
