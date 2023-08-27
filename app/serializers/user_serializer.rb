class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :profile_pic_url

  # has_many :participants
  has_many :workouts
  # has_many :exercises
  def profile_pic_url
    Rails.application.routes.url_helpers.rails_blob_path(object.profile_pic, only_path: true) if object.profile_pic.attached?
  end
end
