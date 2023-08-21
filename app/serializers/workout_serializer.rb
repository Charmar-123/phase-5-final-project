class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :datetime, :workout_type, :intensity
end
