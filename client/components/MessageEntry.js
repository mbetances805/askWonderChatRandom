import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { showMessage } from '../store'

class MessageEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (evt) {
    evt.preventDefault()
    let warningElement = document.getElementById('warning')
    if (this.state.message === '') {
      warningElement.innerHTML = 'Please enter a message'
    } else {
      warningElement.innerHTML = ''
      const {message} = this.state
      const updatedMessage = {message}
      updatedMessage.user = this.props.user
      this.props.sendMessage(updatedMessage)
      this.setState({message: ''})
    }
  }

  handleChange (evt) {
    this.setState({message: evt.target.value})
  }

  render () {
    const {message} = this.state
    return (
      <form id='form-and-button-container' onSubmit={this.handleSubmit}>
        <input
          className='form-control'
          type='text'
          name='message'
          value={message}
          onChange={this.handleChange}
          placeholder='Say something nice...'
        />
        {
          this.props.user.pairing ? <button className='chat-button' type='submit'>Chat!</button>
          : <button className='chat-button' type='submit' disabled>Chat!</button>
        }
        <div id='warning'></div>
      </form>
    )
  }
}

const mapState = null

const mapDispatch = dispatch => ({
  sendMessage: (message) => {
    dispatch(showMessage(message))
  }
})

export default withRouter(connect(mapState, mapDispatch)(MessageEntry))
