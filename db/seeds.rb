User.create(
    name: "John Doe",
    bio: "Fitness enthusiast",
    email: "john@example.com",
    password_digest: BCrypt::Password.create("password")
  )
  
  User.create(
    name: "Jane Smith",
    bio: "Yoga lover",
    email: "jane@example.com",
    password_digest: BCrypt::Password.create("password")
  )
  Workout.create(
    name: "Morning Cardio",
    datetime: DateTime.new(2023, 8, 22, 9, 0),
    workout_type: "Cardio",
    intensity: 3
  )
  
  Workout.create(
    name: "Strength Training",
    datetime: DateTime.new(2023, 8, 23, 15, 30),
    workout_type: "Strength",
    intensity: 4
  )
  workout1 = Workout.find_by(name: "Morning Cardio")
workout2 = Workout.find_by(name: "Strength Training")

Exercise.create(
  name: "Running",
  sets: "1",
  reps: "30 minutes",
  rest: "5 minutes",
  description: "Steady-state running on the treadmill.",
  workout_id: workout1.id
)

Exercise.create(
  name: "Squats",
  sets: "3",
  reps: "12",
  rest: "1 minute",
  description: "Barbell squats for leg strength.",
  workout_id: workout2.id
)

user1 = User.find_by(email: "john@example.com")
user2 = User.find_by(email: "jane@example.com")

workout1 = Workout.find_by(name: "Morning Cardio")
workout2 = Workout.find_by(name: "Strength Training")

Participant.create(user_id: user1.id, workout_id: workout1.id, admin: true)
Participant.create(user_id: user2.id, workout_id: workout2.id, admin: false)
