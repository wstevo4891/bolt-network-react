Rails.application.routes.draw do
  get '/search', to: 'search#index'

  namespace :api, defaults: { format: :json } do
    resources :quotes, only: [:show]
    resources :posts, only: [:show]
    resources :movies, only: [:index, :show]
    resources :genres, only: [:index, :show]
    get '/genres/:id/movie_ids' => 'genres#movie_ids', as: :genres_movie_ids
  end

  # resources :quotes

  resources :genres

  resources :movies

  resources :subgenres

  get '/quotes' => 'pages#quotes'
  get '/slider' => 'pages#slider'

  root to: 'pages#home'
end
