import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getMessages } from '../store'

class MessagesList extends Component {
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.messages !== this.props.messages) {
      this.props.fetchMessages()
    }
  }

  render () {
    let keyId = 0
    let time = new Date()
    console.log("this.props", this.props)
    return (
      <div id='live-chat'>
        <ul className='collection'>
          {/* <li className='collection-item avatar chat-list' key={1}>
            <img alt='' className='circle' />
            <span className='title'><b>SamSam</b></span>
            <p>Hi, Im interested in chatting</p>
          </li>*/}
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
                 <span className='user'><b>{this.props.userName}</b></span>
                 <div className='time'>{time.toLocaleString()}</div>
                 <p>{message}</p>
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
