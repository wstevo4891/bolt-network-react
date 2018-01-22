# app/views/api/movies/show.json.jbuilder

json.extract! @movie, :id, :title, :photo, :year, :rating, :length, :summary,
              :tomato_meter, :genre_ids
json.url movie_url(@movie, format: :json)
