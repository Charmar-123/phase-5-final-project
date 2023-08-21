class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :sets, :reps, :rest, :description, :video
end
