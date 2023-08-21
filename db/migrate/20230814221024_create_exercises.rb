class CreateExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :exercises do |t|
      t.string :name
      t.string :sets
      t.string :reps
      t.string :rest
      t.string :description
      t.belongs_to :workout, null: false, foreign_key: true

      t.timestamps
    end
  end
end
