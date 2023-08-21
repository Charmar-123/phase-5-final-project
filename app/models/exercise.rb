class Exercise < ApplicationRecord
    belongs_to :workout

    has_one_attached :video
end
