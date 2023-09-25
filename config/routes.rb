Rails.application.routes.draw do
  root 'home#index'
  resources :participants
  resources :exercises
  resources :workouts
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post '/login', to: 'sessions#create'
  delete '/logout', to:'sessions#destroy'
  get '/authorized_user', to: 'users#show'
end
