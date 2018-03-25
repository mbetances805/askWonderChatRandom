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
               <li className='collection-item avatar chat-list' key={keyId++}>
                 <span className='user'><b>{message.user.userName}</b></span>
                 <div className='time'>{time.toLocaleString()}</div>
                 <p>{message.message}</p>
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
