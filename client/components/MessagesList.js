import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class MessagesList extends Component {
  render () {
    let keyId = 0
    let time = new Date()

    return (
      <div id='live-chat'>
        <ul className='collection'>
          {
           this.props.messages.map(message => {
             return (
               (this.props.user.userName === message.user.userName)
                ? <li className='chat-list-primary' key={keyId++}>
                  <img
                    className='chat-avatar-image'
                    src='https://image.flaticon.com/icons/svg/270/270094.svg'
                    width='25px'
                    height='25px'
                  />
                  <span className='user'><b>{message.user.userName}</b></span>
                  <p className='time'>{time.toLocaleString().slice(10)}</p>
                  <p className='message'>{message.message}</p>
                </li>
                : <li className='chat-list-secondary' key={keyId++}>
                  <span className='user'><b>{message.user.userName}</b></span>
                  <img
                    className='chat-avatar-image'
                    src='https://image.flaticon.com/icons/svg/270/270098.svg'
                    width='25px'
                    height='25px'
                  />
                  <p className='time'>{time.toLocaleString().slice(10)}</p>
                  <p className='message'>{message.message}</p>
                </li>
             )
           })
        }
        </ul>
      </div>
    )
  }
}

const mapState = state => ({
  messages: state.message.allMessages
})

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(MessagesList))
