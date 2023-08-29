class ParticipantSerializer < ActiveModel::Serializer
  attributes :id, :admin, :user_id, :workout_id
  has_one :user
  has_one :workout
end
