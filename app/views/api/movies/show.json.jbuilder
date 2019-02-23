# app/views/api/movies/show.json.jbuilder

json.extract! @movie, :id, :title, :poster, :year, :rated, :run_time, :plot,
                      :ratings, :release_date, :directors, :writers, :actors,
                      :genre_ids
json.url movie_url(@movie, format: :json)
