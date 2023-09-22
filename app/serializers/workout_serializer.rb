class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :datetime, :workout_type, :intensity, :accessible, :admin, :exercises, :zoom_link

  # has_many :exercises
  def exercises
    ActiveModel::SerializableResource.new(object.exercises,  each_serializer: ExerciseSerializer)
  end
  def admin 
    current_user_id = scope[:id]

    participant = object.participants.find_by(user_id: current_user_id)

    participant&.admin == true
  end
end
