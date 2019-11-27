Rails.application.routes.draw do
  root to: 'home#index'

  get '/genres/:slug', to: 'home#index', as: :genre

  get '/movies/:id', to: 'home#index', as: :movie

  get '/recent', to: 'home#index'

  get '/my-list', to: 'home#index'

  get '/search(/:q)' => 'home#index'

  namespace :api, defaults: { format: :json } do
    get '/genres', to: 'genres#index'

    get '/genres/:id', to: 'genres#show'

    get '/recent-movies', to: 'recent_movies#index'

    get '/movies/:id', to: 'movies#show'

    get '/search/:query', to: 'search#show'

    get '/movies-index', to: 'movies_index#index'

    get '/movies-index/:slide_length', to: 'movies_index#show'

    get '/genres/:id/movie_ids' => 'genres#movie_ids', as: :genres_movie_ids

    namespace :movies do
      get '/by-genre/:genre_id', to: 'by_genre#show'

      post '/search', to: 'search#show'
    end
  end
end
