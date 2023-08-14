class User < ApplicationRecord
    has_many :participants
    has_many :workouts, through: :participants
    has_many :exercises, through: :workouts

    has_secure_password
end
