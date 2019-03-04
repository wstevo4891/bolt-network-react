Rails.application.routes.draw do
  root to: 'home#index'

  get '/genres/:id', to: 'home#index', as: :genre

  get '/movies/:id', to: 'home#index', as: :movie

  get '/recent', to: 'home#index'

  get '/my-list', to: 'home#index'

  get '/search(/:q)' => 'home#index'

  namespace :api, defaults: { format: :json } do
    get '/movies/recent', to: 'movies/recent#show'

    resources :quotes, only: :show
    resources :movies, only: %i[index show]
    resources :genres, only: %i[index show]

    get '/search/:query', to: 'search#show'

    get '/movies-index/:slide_length', to: 'movies_index#show'

    get '/genres/:id/movie_ids' => 'genres#movie_ids', as: :genres_movie_ids

    namespace :movies do
      get '/by-genre/:genre_id', to: 'by_genre#show'

      post '/search', to: 'search#show'
    end
  end
end
