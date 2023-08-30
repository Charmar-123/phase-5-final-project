class WorkoutsController < ApplicationController

    def create
     
        workout = Workout.create!(workout_params)

        Participant.create!(user_id: current_user[:id], workout_id: workout[:id], admin: true)
        render json: workout, status: :created
    end

    def update 
        workout = Workout.find(params[:id])
       
        if workout.participants.find_by(user_id: session[:user_id], admin: true)
            workout.update!(workout_params)
            render json: workout, status: :accepted

        end
      
    end 

    def destroy
        workout = Workout.find(params[:id])
        if workout.participants.find_by(user_id: session[:user_id], admin: true)
            workout.destroy
             head :no_content
        else
            head :forbidden
        end
    end

    private

    def workout_params
        params.permit(:name, :datetime, :workout_type, :intensity, :accessible)
    end
end
