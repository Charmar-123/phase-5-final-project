Rails.application.routes.draw do
 
  namespace :api do
    resources :participants
    resources :exercises
    resources :workouts
    resources :users
    post '/login', to: 'sessions#create'
    delete '/logout', to:'sessions#destroy'
    get '/authorized_user', to: 'users#show'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  end
    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }


end
