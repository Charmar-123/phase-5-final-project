class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.string :name
      t.datetime :datetime
      t.string :workout_type
      t.integer :intensity
      t.string :zoom_link

      t.timestamps
    end
  end
end
