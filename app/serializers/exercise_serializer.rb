class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :sets, :reps, :rest, :description, :video_url, :order

# belongs_to :workout
  def video_url
    Rails.application.routes.url_helpers.rails_blob_path(object.video, only_path: true) if object.video.attached?
  end
end
