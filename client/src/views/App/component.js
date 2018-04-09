import React, { Component } from 'react'
import PropTypes from "prop-types"
import {
  Router,
  Route,
  Redirect
} from 'react-router-dom'
import Config from '../../config'
import createHistory from 'history/createBrowserHistory'
import Dashboard from '../Dashboard/container'
import SideNavigation from '../../components/sideNavigation'
import TopNavigation from '../../components/topNavigation'
import Login from '../Login/container'
import Home from '../Home/container'
import Users from '../Users/container'
// import ResetPassword from '../ResetPassword/container'
import UserModel from '../../store/user/user-model'
import * as Phase from '../../constants/phase'
// import forgetPassword from '../ForgetPassword/container'
import signUp from '../SignUp/container'

const history = createHistory()
const PUBLIC_URL = process.env.PUBLIC_URL
const PrivateRoute = ({ component, ...rest }) => {
  let user = window.localStorage.getItem("user")
  const isAuthed = (user ? true : false)
  return (
    <Route {...rest} exact
      render = {(props) => (
        isAuthed ? (
          <div>
            {React.createElement(component, props)}
          </div>
        ) :
        (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      )}
    />
  )
}
PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func
  ]).isRequired,
  location: PropTypes.object,
   redirectURL: PropTypes.string
}
class App extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  static propTypes = {
    token: PropTypes.string,
    phase: PropTypes.string,
  }

  render() {
    let userData ={}
    const {
      user,
      token,
      phase,
      redirectURL
    } = this.props
    return (
      <Router history={history}>
        <div className="App-pageContainer">
          <Route exact path="/" render={() =>
          <Redirect to="/home" />} />
          <Route path={'/home'} component={Home} />
          <Route path={'/login'} component={Login} />
         {/* <Route path={'/reset/:token'} component={ResetPassword} />
          <Route path={'/forgetPassword'} component={forgetPassword} />*/}
          <PrivateRoute path={'/dashboard'} user={user} component={Dashboard} />
          <Route path={'/signUp'} component={signUp} />
        </div>
      </Router>
    )
  }
}
export default App
