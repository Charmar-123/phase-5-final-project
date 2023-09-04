class AddOrderToExercises < ActiveRecord::Migration[6.1]
  def change
    add_column :exercises, :order, :integer
  end
end
