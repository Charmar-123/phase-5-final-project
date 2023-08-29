class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :datetime, :workout_type, :intensity, :exercises, :accessible, :admin

  def admin 
    current_user_id = scope[:id]

    participant = object.participants.find_by(user_id: current_user_id)

    participant&.admin == true
  end
end
