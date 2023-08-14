class Workout < ApplicationRecord
    has_many :participants
    has_many :users, through: :participants
    has_many :exercises, dependent: :destroy
end
