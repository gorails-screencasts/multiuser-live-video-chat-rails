json.extract! room, :id, :name, :vonage_session_id, :created_at, :updated_at
json.url room_url(room, format: :json)
