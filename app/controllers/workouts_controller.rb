class WorkoutsController < ApplicationController

    def create
     
        workout = Workout.create!(workout_params)

        Participant.create!(user_id: current_user[:id], workout_id: workout[:id], admin: true)
        render json: workout, status: :created
    end

    private

    def workout_params
        params.permit(:name, :datetime, :workout_type, :intensity)
    end
end
