# app/views/api/movies/show.json.jbuilder

json.extract! @movie, :title, :poster, :year, :rated, :run_time, :plot,
                      :ratings, :release_date, :directors, :writers, :actors

json.genres @movie.genres_list
