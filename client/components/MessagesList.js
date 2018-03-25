import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getMessages } from '../store'

class MessagesList extends Component {
  componentDidMount () {
    this.props.fetchMessages()
  }

  render () {
    let keyId = 0
    let time = new Date()
    console.log('this.props.messages', this.props.messages)

    return (
      <div id='live-chat'>
        <ul className='collection'>
          {
           this.props.messages.map(message => {
             return (
               <li className='collection-item avatar chat-list' key={keyId++}>
                 <img
                   src='https://image.flaticon.com/icons/svg/270/270094.svg'
                   alt='avatar'
                   width='25px'
                   height='25px'
                   className='circle-avatar'
                 />
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

const mapDispatch = dispatch => ({
  fetchMessages: () => {
    dispatch(getMessages())
  }
})

export default withRouter(connect(mapState, mapDispatch)(MessagesList))
