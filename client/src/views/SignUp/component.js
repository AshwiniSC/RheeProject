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
import RaisedButton from 'material-ui/RaisedButton'
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
import logo from '../../../public/logo.png'
const required = value => value ? '' : <div><p className="error-text">Required <i className="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i></p></div>

const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? <div><p className="error-text">Invalid email address<i className="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i></p></div>
  : ''

const styles = {
    underlineFocusStyle: {
    borderColor: "#009587"
  }
}
const raisedStyle = {
    height: 51,
    backgroundColor:'#009587',
}

class SingupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      nickName: "",
      schoolName: "",
      err: {},
      openSnackbar: false,
      errMessage:'',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
     this.context.router.history.push('/admindashboard')
   }
 }
  componentWillReceiveProps(nextProps) {
    if (nextProps.phase === "error") {
      this.setState({ errMessage: nextProps.rxError.message, openSnackbar: true})
    }
  }

  handleSubmit(data) {
    const { signUpUser } = this.props
    const formdata = {
      email: data.email,
      password: data.password,
      nickName: data.nickName,
      schoolName: data.schoolName,
    }
    signUpUser(formdata)
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
    if(phase == "success"){
      return(
        <Redirect to={`/dashboard`}/>
      )
    }

    return (
    <div>
      <Header {...this.props}/>
      <div id="login-page">
        <div className="middle-container">
          <center>
            <p>Rhee-Project</p>
           {/* <div className="logo-box" style={{width: '226px', height: '184px', backgroundColor: '#ccc'}}>
              <img className="signin-logo img-responsive" src="img/logo.png" style={{width: '171px', 'padding-top':'47px'}}/>
            </div>*/}
          </center>
          <br/>
          <form  onSubmit={handleSubmit(this.handleSubmit)} >
              <div>
                <Field name="nickName"
                  component={TextField}
                  validate={[ required]}
                  name="nickName"
                  fullWidth
                  className="welocme"
                  underlineFocusStyle={styles.underlineFocusStyle}
                  floatingLabelText="Enter Nick Name"
                  />
              </div>
              <div>
                <Field name="schoolName"
                  component={TextField}
                  validate={[ required]}
                  name="schoolName"
                  fullWidth
                  className="welocme"
                  underlineFocusStyle={styles.underlineFocusStyle}
                  floatingLabelText="Enter School Name"
                  />
              </div>
              <div>
                <Field name="email"
                  component={TextField}
                  validate={[ required, email ]}
                  name="email"
                  fullWidth
                  className="welocme"
                  underlineFocusStyle={styles.underlineFocusStyle}
                  floatingLabelText="Enter Email Address"
                  />
              </div>
              <div>
                <Field name="password"
                  component={TextField}
                  validate={[ required ]}
                  name="password"
                  underlineFocusStyle={styles.underlineFocusStyle}
                  type="password"
                  fullWidth
                  floatingLabelText="Enter Password"
                />
              </div>
              <br/>
              <br/>
              <div className="RaisedButton-box">
                <RaisedButton
                  buttonStyle={raisedStyle}
                  style={raisedStyle}
                  fullWidth
                  type="submit" label="Register"
                  primary={true}
                />
              </div>
            </form>
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

export default reduxForm({
  form: 'login',  // a unique identifier for this form
  destroyOnUnmount: true,
})(SingupForm)
