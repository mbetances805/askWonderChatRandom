import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postUser } from '../store'
import history from '../history'

class UserNameEntry extends Component {
  constructor () {
    super()
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (evt) {
    evt.preventDefault()
    let roomId = this.state.text + (Math.floor(Math.random() * 10000))
    history.push(`/chatRoom/${roomId}`)
    this.props.createUser(this.state.text)
  }

  handleChange (evt) {
    this.setState({text: evt.target.value})
  }

  render () {
    const { text } = this.state
    return (
      <div id='new-message-form'>
        <h3 id='welcome-message'>Hi! Please enter a username to start chatting...</h3>
        <section>
          <form onSubmit={this.handleSubmit}>
            <div id='form-and-button-container'>
              <input
                className='form-control'
                type='text'
                name='text'
                value={text}
                onChange={this.handleChange}
                placeholder='Enter a username...'
              />
              <button className='submit-button' type='submit'>Submit</button>
            </div>
          </form>
        </section>
      </div>
    )
  }
}

const mapState = null

const mapDispatch = dispatch => ({
  createUser: (userName) => {
    dispatch(postUser(userName))
  }
})

export default withRouter(connect(mapState, mapDispatch)(UserNameEntry))

// to populate
UserNameEntry.propTypes = {

}
