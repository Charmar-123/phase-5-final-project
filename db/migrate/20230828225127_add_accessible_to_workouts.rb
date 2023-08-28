class AddAccessibleToWorkouts < ActiveRecord::Migration[6.1]
  def change
    add_column :workouts, :accessible, :boolean, default: true

  end
end
