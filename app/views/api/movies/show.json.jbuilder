# frozen_string_literal: true

json.extract! @movie,
              :id, :title, :slug, :poster, :photo, :year,
              :rating, :runtime, :plot, :reviews, :release_date,
              :directors, :writers, :actors

json.url "/movies/#{@movie.id}"

json.genres @movie.genres_list
