import { Controller } from "stimulus"

export default class extends Controller {
  connect() {
    this.apiKey = this.data.get("apiKey")
    this.sessionId = this.data.get("sessionId")
    this.token = this.data.get("token")
    this.initializeSession()
  }

  disconnect() {
    if (this.session) {
      this.session.disconnect()
    }
  }

  initializeSession() {
    this.session = OT.initSession(this.apiKey, this.sessionId)
    this.session.on('streamCreated', this.streamCreated.bind(this))

    this.publisher = OT.initPublisher(this.element, {
      insertMode: 'append',
      width: '100%',
      height: '100%',
      name: this.data.get("name"),
    }, this.handleError.bind(this))

    this.session.connect(this.token, this.streamConnected.bind(this))
  }

  streamConnected(error) {
    if (error) {
      this.handleError(error)
    } else {
      this.session.publish(this.publisher, this.handleError.bind(this))
    }
  }

  streamCreated(event) {
    this.session.subscribe(event.stream, this.element, {
      insertMode: 'append',
      width: '100%',
      height: '100%',
    }, this.handleError.bind(this))
  }

  handleError(error) {
    if (error) {
      console.error(error.message)
    }
  }
}
