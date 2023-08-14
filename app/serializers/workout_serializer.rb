class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :exercise_type, :intensity
end
