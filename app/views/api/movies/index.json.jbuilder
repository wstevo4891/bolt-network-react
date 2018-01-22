# app/views/api/movies/index.json.jbuilder

# Generated index jbuilder
json.array!(@movies) do |movie|
  json.extract! movie, :id, :title, :photo, :year,
                :rating, :length, :summary,
                :tomato_meter, :genre_ids
  json.url movie_url(movie, format: false)
end
