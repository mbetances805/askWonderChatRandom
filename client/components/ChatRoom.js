import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { MessageEntry, MessagesList } from './index'
import { getUser } from '../store'

class ChatRoom extends Component {
  componentDidMount () {
    this.props.fetchUser()
  }

  render () {
    return (
      <div className='chat-box'>
        <div className='chat-message-list'>
          <MessagesList userName={this.props.user} />
        </div>
        <div className='chat-message-entry'>
          <MessageEntry />
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user[0]
})

const mapDispatch = dispatch => ({
  fetchUser: () => {
    dispatch(getUser())
  }
})

export default withRouter(connect(mapState, mapDispatch)(ChatRoom))

// to populate
ChatRoom.propTypes = {

}
