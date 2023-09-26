Rails.application.routes.draw do
 
    resources :participants, only: [:create, :destroy]
    resources :exercises, only: [ :index, :create, :update, :destroy]
    resources :workouts, only: [ :index, :create, :update, :destroy]
    resources :users, only: [:show, :create]
    post '/login', to: 'sessions#create'
    delete '/logout', to:'sessions#destroy'
    get '/authorized_user', to: 'users#show'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }


end
