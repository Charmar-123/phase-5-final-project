class UserSerializer < ActiveModel::Serializer
  attributes :id,:profile_pic_url, :name, :email

  has_many :ordered_workouts, key: :workouts
  # has_many :participants

  def ordered_workouts
    object.workouts.order(datetime: :asc)
  end


  def profile_pic_url
    Rails.application.routes.url_helpers.rails_blob_path(object.profile_pic, only_path: true) if object.profile_pic.attached?
  end
end
