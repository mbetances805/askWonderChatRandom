import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { MessageEntry, MessagesList } from './index'
import { fetchUser, updateStatus } from '../store'

class ChatRoom extends Component {
  componentDidMount () {
    this.props.getUser()
    console.log('chatRoom', this.props.user)
  }

  componentDidUpdate (prevProps) {
    let {socketId} = this.props.user
    let {pairing} = this.props.user
    if (prevProps.user.pairing !== pairing) {
      this.props.checkPairing(socketId, pairing)
    }
  }

  render () {
    return (
      <div className='chat-box'>
        {
          this.props.user.pairing ? <div />
            : <div className='overlay'>Waiting for other users to join!</div>
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
  getUser: () => {
    dispatch(fetchUser())
  },
  checkPairing: (socketId, status) => {
    dispatch(updateStatus(socketId, status))
  }
})

export default withRouter(connect(mapState, mapDispatch)(ChatRoom))

// to populate
ChatRoom.propTypes = {

}
