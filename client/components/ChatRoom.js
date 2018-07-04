import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { MessageEntry, MessagesList } from './index'
import { checkPairing } from '../store'

class ChatRoom extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.user.room !== this.props.user.room) {
      this.props.createPair(nextProps.user.room)
    }
  }
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

const mapDispatch = dispatch => ({
  createPair: (roomId) => {
    dispatch(checkPairing(roomId))
  }
})

export default withRouter(connect(mapState, mapDispatch)(ChatRoom))

// to populate
ChatRoom.propTypes = {

}
