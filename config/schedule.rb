every 1.minute do
    runner "UpdateWorkoutAccessibilityJob.perform_now", environment: 'development', output: 'log/whenever.log'
  end
  