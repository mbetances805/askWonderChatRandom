import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

export class MessagesList extends Component {
  render () {
    return (
      <div id='live-chat'>
        <ul className='collection'>
          <li className='collection-item avatar chat-list' key={1}>
            <img alt='' className='circle' />
            <span className='title'><b>SamSam</b></span>
            <p>Hi, Im interested in chatting</p>
          </li>
          {/*
             messageEntry.allMessages.map(message => {
              return (
                <li className='collection-item avatar chat-list' key={message.id}>
                  <img src={message.user.image} alt='' className='circle' />
                  <span className='title'><b>{message.user.name}</b></span>
                  <p>{message.text}
                  </p>
                </li>

              )
            })
          */}
        </ul>
      </div>
    )
  }
}

const mapState = null

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(MessagesList))
