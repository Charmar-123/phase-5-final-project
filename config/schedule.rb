every 2.minutes do
    runner "UpdateWorkoutAccessibilityJob.perform_now"
  end