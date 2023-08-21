class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :datetime, :exercise_type, :intensity
end
