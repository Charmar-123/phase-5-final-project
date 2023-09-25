# Controller logic: fallback requests for React Router.
# Leave this here to help deploy your app later!
class FallbackController < ActionController::Base

  def index
    # React app index page
    file_path = Rails.root.join('public', 'index.html')
    render file: file_path, layout: false
  end
end
