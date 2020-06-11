class Room < ApplicationRecord
  before_create do
    opentok = OpenTok::OpenTok.new Rails.application.credentials.vonage_api_key, Rails.application.credentials.vonage_api_secret
    session = opentok.create_session
    self.vonage_session_id = session.session_id
  end
end
