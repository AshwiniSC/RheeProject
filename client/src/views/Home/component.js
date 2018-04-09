import 'rxjs'
import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Field, reduxForm } from 'redux-form'
import UserModel from '../../store/user/user-model'
import config from '../../config'
import { Redirect, Link } from 'react-router-dom'
import Snackbar from 'material-ui/Snackbar'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton';
import Header from '../../components/topNavigation'

import './styles.scss'
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'


/*const styles = {
    underlineFocusStyle: {
    borderColor: "#009587"
  }
}
const raisedStyle = {
    height: 51,
    backgroundColor:'#009587',
}*/

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      err: {},
      openSnackbar: false,
      errMessage:'',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }
  static contextTypes = {
   router: PropTypes.object
 }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  componentWillMount() {
   let user = window.localStorage.getItem("user")
   const isAuthed = (user ? true : false)
   if(isAuthed){
     // this.context.router.history.push('/admindashboard')
   }
 }
  componentWillReceiveProps(nextProps) {
    if (nextProps.phase === "error") {
      this.setState({ errMessage: nextProps.rxError.message, openSnackbar: true})
    }
  }

  handleRequestClose() {
    this.setState({
      openSnackbar: false,
      errMessage: ''
    })
  }

  render() {
    const {
      handleSubmit,
      pristine,
      isSubmitting,
      rxError,
      user,
      token,
      phase
    } = this.props
    /*if(phase == "success"){
      return(
        <Redirect to={`/admindashboard`}/>
      )
    }*/

    return (
    <div>
    <Header {...this.props}/>
      <div id="home-page">
        <div>
        <div className="uper-section">
          <div className="login-btn-div">
            <RaisedButton label="Login" onClick={() => { this.context.router.history.push('/login') }}/>
          </div>
        </div>
        <Snackbar
              open={this.state.openSnackbar}
              message={this.state.errMessage}
              autoHideDuration={1000}
              onRequestClose={this.handleRequestClose}
              className=""
            />
          </div>
        </div>
      </div>
    )
  }
}

