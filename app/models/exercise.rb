class Exercise < ApplicationRecord
    belongs_to :workout

    has_one_attached :video

    before_create :set_order

    validates :name, presence: {message: "Give the exercise a name!"}
    validates :sets, presence: {message: "Pick the number of sets!"}
    validates :reps, presence: {message: "Pick the number of reps!"}
    validates :rest, presence: {message: "Pick how many seconds of rest!"}

    private
  
    def set_order
      highest_order = self.workout.exercises.maximum(:order)
      self.order = highest_order ? highest_order + 1 : 1
    end
end
