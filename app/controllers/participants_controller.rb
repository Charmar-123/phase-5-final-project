class ParticipantsController < ApplicationController

    def create
        participant = Participant.create!(participant_params.merge(admin: false))
        workout = Workout.find(participant.workout_id)
        render json: workout, status: :created
    end

    def destroy
        participant = Participant.find_by(workout_id: params[:id], user_id: session[:user_id])
        if participant
            participant.destroy
            head :no_content
        else 
            render json: {errors: 'No Access'}
        end
    end
    private

    def participant_params
        params.permit(:workout_id, :user_id)
    end
end
