# app/views/api/movies/index.json.jbuilder
json.movies @movies do |movie|
  json.title movie.title
  json.photo movie.photo
  json.year movie.year
  json.rating movie.rating
  json.length movie.length
  json.summary movie.summary
  json.tomato_meter movie.tomato_meter
  json.genre_ids movie.genre_ids
end

# json.extract! @movies, :id, :title, :image, :year, :rating, :length, :summary,
#               :tomato_meter, :genre_ids
