json.array!(@movies) do |movie|
  json.extract! movie, :id, :title, :photo, :logo, :year, :rated, :run_time, :plot,
                       :ratings, :genre_ids
  json.url movie_url(movie.id)
end
