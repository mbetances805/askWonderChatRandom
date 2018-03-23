import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {MessageEntry, MessagesList} from './index'

const ChatRoom = () => {
  return (
    <div className='chat-box'>
      <div className='chat-message-list'>
        <MessagesList />
      </div>
      <div className='chat-message-entry'>
        <MessageEntry />
      </div>
    </div>
  )
}

const mapState = null

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(ChatRoom))

// to populate
ChatRoom.propTypes = {

}
