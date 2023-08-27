class WorkoutsController < ApplicationController

    def create
     
        workout = Workout.create!(workout_params)
        byebug
        render json: workout, status: :created
    end

    private

    def workout_params
        params.permit(:name, :datetime, :workout_type, :intensity)
    end
end
