class User < ApplicationRecord
    # associations
    has_many :participants
    has_many :workouts, through: :participants
    has_many :exercises, through: :workouts
    before_save :downcase_email
    # validations
    has_secure_password(options={validations:false})
    validates :name, presence:  { message: "Name can't be blank" }
    validates :password, presence: { message: "Password can't be blank" }
    validates :email, presence: { message: "" }, format: { with: URI::MailTo::EMAIL_REGEXP, message: "Not a valid email format" }
    validates :email, uniqueness: { message: "An account already exists with this email address" }
    validate :password_complexity
    validates :password, confirmation: {message: "Password does not match"}, if: -> { password.present? }
    validates :password_confirmation, presence: {message: ""}

    def password_complexity
        return unless password.present?
      
        errors.add(:password, "Must contain at least one capital letter") unless password.match?(/[A-Z]/)
        errors.add(:password, "Must contain at least one number") unless password.match?(/\d/)
        errors.add(:password, "Must contain at least one symbol !@#$%^&*") unless password.match?(/[!@#$%^&*]/) 
        errors.add(:password, "Must be at least 8 characters long") unless password.length >= 8
    end
    def downcase_email
        self.email = email.downcase.strip if email
    end


    has_one_attached :profile_pic
end
