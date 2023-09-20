class ParticipantsController < ApplicationController

    def create
        participant = Participant.create!(participant_params.merge(admin: false))
        byebug
        render json: participant, status: :created
    end

    private

    def participant_params
        params.permit(:workout_id, :user_id)
    end
end
