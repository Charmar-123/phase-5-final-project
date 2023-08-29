class WorkoutsController < ApplicationController

    def create
     
        workout = Workout.create!(workout_params)

        Participant.create!(user_id: current_user[:id], workout_id: workout[:id], admin: true)
        render json: workout, status: :created
    end

    def destroy
        byebug
        workout = Workout.find_by(id: params[:id])
        if workout.participants.find_by(user_id: session[:user_id], admin: true)
            workout.destroy
             head :no_content
        else
            head :forbidden
        end
    end

    private

    def workout_params
        params.permit(:name, :datetime, :workout_type, :intensity)
    end
end
