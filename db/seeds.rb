# db/seeds.rb

# Users
user1 = User.create(name: 'Alice', bio: 'Fitness enthusiast', email: 'alice@example.com', password_digest: BCrypt::Password.create("1234"))
user2 = User.create(name: 'Bob', bio: 'Gym addict', email: 'bob@example.com', password_digest: BCrypt::Password.create("1234"))

# Workouts
workout1 = Workout.create(date: '2023-08-15', time: 60, exercise_type: 'Cardio', intensity: 7)
workout2 = Workout.create(date: '2023-08-16', time: 45, exercise_type: 'Strength Training', intensity: 8)

# Exercises
exercise1 = Exercise.create(name: 'Running', sets: '1', reps: '1', weight: '0', target_area: 'Cardio', description: '30-minute jog', workout_id: workout1)
exercise2 = Exercise.create(name: 'Squats', sets: '3', reps: '10', weight: '50', target_area: 'Legs', description: 'Bodyweight squats', workout_id: workout2)

# Participants
participant1 = Participant.create(user: user1, workout: workout1, admin: true)
participant2 = Participant.create(user: user2, workout: workout1, admin: false)
participant3 = Participant.create(user: user1, workout: workout2, admin: true)