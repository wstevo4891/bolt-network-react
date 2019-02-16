# app/views/api/movies/show.json.jbuilder

json.extract! @movie, :id, :title, :photo, :year, :rated, :run_time, :plot,
                      :ratings, :genre_ids
json.url movie_url(@movie, format: :json)
