class Api::UsersController < ApplicationController
    skip_before_action :authorized_user, only: [:create]

    def show 
        user = current_user
        render json: user, status: :ok
    end 

    def create
        # byebug
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end 
    
    private 

    def user_params
        params.permit(:bio, :email, :password, :password_confirmation ,:name, :profile_pic)
    end 
end
