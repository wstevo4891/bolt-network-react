# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'home#index'

  get '/genres/:slug', to: 'home#index', as: :genre

  get '/movies/:id', to: 'home#index', as: :movie

  get '/recent', to: 'home#index'

  get '/my-list', to: 'home#index'

  get '/search(/:q)', to: 'home#index'

  namespace :api, defaults: { format: :json } do
    get '/movies-index', to: 'movies_index#index'

    get '/movies/:id', to: 'movies#show'

    get '/recent-movies', to: 'recent_movies#index'

    get '/search/:query', to: 'search#show'

    get '/suggestions/:query/:suggestion_id', to: 'suggestions#show'

    namespace :movies do
      get '/recent', to: 'recent#index'

      post '/search', to: 'search#show'

      get '/top-genres', to: 'top_genres#index'
    end
  end

  costraints Rails.env.development? do
    get '/query-labs', to: 'query_labs#show'
  end
end
