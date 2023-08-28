class UpdateWorkoutAccessibilityJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    Workout.where("datetime < ?", Time.current).update_all(accessible: false)
  end
end
