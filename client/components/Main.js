import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {UserNameEntry} from './index'

const Main = (props) => {

  return (
    <div id='polygon-container'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
      >
        <polygon
          fill='white'
          points='0,100 100,0 100,100'
        />
      </svg>
      <UserNameEntry />
    </div>
  )
}

const mapState = null

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(Main))

// to populate
Main.propTypes = {

}
