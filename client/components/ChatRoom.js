import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { MessageEntry, MessagesList } from './index'

class ChatRoom extends Component {
  render () {
    return (
      <div className='chat-box'>
        {
          this.props.user.pairing ? <div />
            : <div className='overlay'>{'Waiting for another user to join!'}</div>
        }
        <div className='chat-message-list'>
          <MessagesList user={this.props.user} />
        </div>
        <div className='chat-message-entry'>
          <MessageEntry user={this.props.user} />
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(ChatRoom))

// to populate
ChatRoom.propTypes = {

}
