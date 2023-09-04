class ExercisesController < ApplicationController

    def index 
        render json: Exercise.all, status: :ok
    end

    def update 
        exercise = Exercise.find(params[:id])
       byebug
        if exercise.workout.participants.find_by(user_id: session[:user_id], admin: true)
            exercise.update!(exercise_params)
            render json: workout, status: :accepted
        end
      
    end 
    def create
        exercise = Exercise.create(exercise_params)
        render json: exercise, status: :ok
    end


    private 

    def exercise_params
        params.permit(:video, :name, :sets, :reps, :rest, :description, :workout_id)
    end
end
