import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { addMessage } from '../store'

class MessageEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.postMessage(this.state.text)
    this.setState({text: ''})
  }

  handleChange (evt) {
    this.setState({text: evt.target.value})
  }

  render () {
    const {text} = this.state
    return (
      <form id='form-and-button-container' onSubmit={this.handleSubmit}>
        <input
          className='form-control'
          type='text'
          name='text'
          value={text}
          onChange={this.handleChange}
          placeholder='Say something nice...'
        />
        <button className='chat-button' type='submit'>Chat!</button>
      </form>
    )
  }
}

const mapState = null

const mapDispatch = dispatch => ({
  postMessage: (message) => {
    dispatch(addMessage(message))
  }
})

export default withRouter(connect(mapState, mapDispatch)(MessageEntry))
