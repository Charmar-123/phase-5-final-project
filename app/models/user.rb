class User < ApplicationRecord
    # associations
    has_many :participants
    has_many :workouts, through: :participants
    has_many :exercises, through: :workouts
    before_save :downcase_email
    # validations
 
    validates :name, presence: true
    validates :password, presence: true
    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: "Invalid email format" }
    validates :email, uniqueness: true
    validate :password_complexity

    def password_complexity
        # byebug
        return unless password.present?
      unless password.match?(/[A-Z]/)
        errors.add(:password, "must contain at least one capital letter")
      end
  
      unless password.match?(/\d/)
        errors.add(:password, "must contain at least one number")
      end
  
      unless password.match?(/[!@#$%^&*]/) # Replace with allowed symbols
        errors.add(:password, "must contain at least one symbol !@#$%^&*")
      end
  
      unless password.length >= 8
        errors.add(:password, "must be at least 8 characters long")
      end
    end
    def downcase_email
        self.email = email.downcase.strip if email
        end

    has_secure_password
    has_one_attached :profile_pic
end
