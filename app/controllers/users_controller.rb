class UsersController < ApplicationController
    skip_before_action :authorized_user, only: [:create]

    def show 
        user = current_user
        render json: user, status: :ok
    end 

    def create
        # byebug
        user = User.create!(user_params)
        render json: user, status: :created
    end 
    
    private 

    def user_params
        params.permit(:bio, :email, :password, :name, :profile_pic)
    end 
end
