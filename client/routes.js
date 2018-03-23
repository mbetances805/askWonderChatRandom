import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, ChatRoom } from './components'

class Routes extends Component {
  render () {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/home' component={Main} />
          <Route path='/chatRoom' component={ChatRoom} />
        </Switch>
      </Router>
    )
  }
}

const mapState = null

const mapDispatch = null

export default connect(mapState, mapDispatch)(Routes)

Routes.propTypes = {

}
