class ExercisesController < ApplicationController

    def index 
        render json: Exercise.all, status: :ok
    end

    def create
        exercise = Exercise.create(exercise_params)
        render json: exercise, status: :ok
    end


    private 

    def exercise_params
        params.permit(:video, :name)
    end
end
