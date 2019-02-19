Rails.application.routes.draw do
  root to: 'home#index'

  get '/quotes' => 'quotes#index'

  get '/slider' => 'slider#index'

  get '/cards' => 'cards#index'

  get '/animations' => 'animations#index'

  get '/search(/:query)' => 'search#show', defaults: { format: :json }

  resources :movies, only: :show

  resources :genres, only: :show

  namespace :admin do
    resources :quotes
    resources :genres
    resources :movies
    resources :subgenres
  end

  namespace :api, defaults: { format: :json } do
    resources :quotes, only: :show
    resources :movies, only: %i[index show]
    resources :genres, only: %i[index show]

    get '/movies-index', to: 'movies_index#show'
    get '/genres/:id/movie_ids' => 'genres#movie_ids', as: :genres_movie_ids

    namespace :movies do
      get '/by-genre/:genre_id', to: 'by_genre#show'
      post '/search', to: 'search#show'
    end
  end
end
