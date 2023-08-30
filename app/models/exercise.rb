class Exercise < ApplicationRecord
    belongs_to :workout

    has_one_attached :video

    before_create :set_order

    private
  
    def set_order
      highest_order = self.workout.exercises.maximum(:order)
      self.order = highest_order ? highest_order + 1 : 1
    end
end
