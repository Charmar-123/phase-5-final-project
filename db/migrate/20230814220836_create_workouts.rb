class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.datetime :datetime
      t.string :exercise_type
      t.integer :intensity

      t.timestamps
    end
  end
end
