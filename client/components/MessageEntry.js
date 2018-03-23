import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class MessageEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {

  }

  handleSubmit = (evt) => {
    evt.preventDefault()
  }

  handleChange(evt) {

  }

  render() {
    const {text} = this.state
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg row">
          <input
            className="form-control"
            type="text"
            name="text"
            value={text}
            onChange={this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="">
            <button className="black" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    )
  }
}

const mapState = null

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(MessageEntry))
