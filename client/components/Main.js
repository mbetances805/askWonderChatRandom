import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {MessageEntry, MessagesList} from './index.js'

const Main = (props) => {

  return (
    <div>
      <h1>Chat Random</h1>
      <nav>
        <div>
          <Link to='/home'>Home </Link>
        </div>
      </nav>
      <hr />
      <MessagesList />
      <MessageEntry />
    </div>
  )
}

const mapState = null

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(Main))

// to populate
Main.propTypes = {

}
