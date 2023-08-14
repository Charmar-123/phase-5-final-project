class ParticipantSerializer < ActiveModel::Serializer
  attributes :id, :admin
  has_one :user
  has_one :workout
end
