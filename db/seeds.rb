user1 = User.create(
  name: "John Doe",
  bio: "Fitness enthusiast",
  email: "john@example.com",
  password_digest: BCrypt::Password.create("password")
)

user2 = User.create(
  name: "Jane Smith",
  bio: "Yoga lover",
  email: "jane@example.com",
  password_digest: BCrypt::Password.create("password")
)

# workout1 = Workout.create(
#   name: "Morning Cardio",
#   datetime: DateTime.new(2023, 8, 22, 9, 0),
#   workout_type: "Cardio",
#   intensity: 3,
#   accessible: true
# )

# workout2 = Workout.create(
#   name: "Strength Training",
#   datetime: DateTime.new(2023, 8, 23, 15, 30),
#   workout_type: "Strength",
#   intensity: 4,
#   accessible: true
# )

# Exercise.create(
#   name: "Running",
#   sets: "1",
#   reps: "30 minutes",
#   rest: "5 minutes",
#   description: "Steady-state running on the treadmill.",
#   workout_id: workout1.id
# )

# Exercise.create(
#   name: "Squats",
#   sets: "3",
#   reps: "12",
#   rest: "1 minute",
#   description: "Barbell squats for leg strength.",
#   workout_id: workout2.id
# )

# Create participants
Participant.create(user_id: 1, workout_id: 1, admin: true)
Participant.create(user_id: 2, workout_id: 1, admin: false)
Participant.create(user_id: 1, workout_id: 2, admin: true)
Participant.create(user_id: 2, workout_id: 2, admin: false)
Workout.create(name: "Morning Workout", datetime: DateTime.now, workout_type: "Cardio", intensity: 3, accessible: true)
Workout.create(name: "Evening Workout", datetime: DateTime.now, workout_type: "Strength", intensity: 4, accessible: true)

# Create exercises
Exercise.create(name: "Push-up", sets: "3", reps: "15", rest: "60 seconds", description: "Standard push-ups", workout_id: 1, order: 1)
Exercise.create(name: "Squat", sets: "3", reps: "12", rest: "45 seconds", description: "Bodyweight squats", workout_id: 1, order: 2)
Exercise.create(name: "Running", sets: "1", reps: "30 minutes", rest: "0 seconds", description: "Morning jog", workout_id: 2, order: 1)
Exercise.create(name: "Bench Press", sets: "4", reps: "10", rest: "90 seconds", description: "Barbell bench press", workout_id: 2, order: 2)