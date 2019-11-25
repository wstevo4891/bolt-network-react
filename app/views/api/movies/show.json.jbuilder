# app/views/api/movies/show.json.jbuilder

json.extract! @movie,
              :id, :title, :slug, :poster, :photo, :year,
              :rated, :run_time, :plot, :ratings, :release_date,
              :directors, :writers, :actors

json.url "/movies/#{@movie.id}"

json.genres @movie.genres_list
