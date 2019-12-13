# app/views/search/show.json.jbuilder

json.movies do
  json.array! @results.movies do |movie|
    json.extract! movie,
                  :id, :title, :slug, :photo,
                  :year, :rated, :run_time, :plot
    # json.url "/movies/#{movie.id}"
    json.genres movie.genres_list
    json.suggestionId "#{movie.id}_movie"
  end
end
