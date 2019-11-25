# app/views/api/movies/search/show.json.jbuilder

json.array!(@movies) do |movie|
  json.extract! movie,
                :id, :title, :slug, :poster, :photo, :year, :rated,
                :run_time, :plot, :ratings, :release_date, :directors,
                :writers, :actors, :banner, :logo

  json.url "/movies/#{movie.id}"

  json.genres movie.genres_list
end
