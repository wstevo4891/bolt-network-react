# app/views/api/movies/show.json.jbuilder
json.extract! @movie, :id, :title, :photo, :year, :rating, :length, :summary,
              :tomato_meter, :genre_ids
