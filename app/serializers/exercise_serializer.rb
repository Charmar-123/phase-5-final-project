class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :sets, :reps, :weight, :target_area, :description
end
