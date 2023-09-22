class Workout < ApplicationRecord
    has_many :participants, dependent: :destroy
    has_many :users, through: :participants
    has_many :exercises, dependent: :destroy

    validates :name, presence: {message: 'Workout must have a name!'}

    validates :zoom_link, format: { with: URI::DEFAULT_PARSER.make_regexp, message: 'Must be a valid URL!' }
  
    validates :intensity, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5, message: 'Pick an intensity!' }
  
    validates :workout_type, length: { maximum: 301, message: "Maximum of 300 characters!" }
  
    validate :datetime_must_be_in_future
  
    private
  
    def datetime_must_be_in_future
      if datetime.present? && datetime <= Time.now
        errors.add(:datetime, 'Date and time must be in the future!')
      end
    end
end
