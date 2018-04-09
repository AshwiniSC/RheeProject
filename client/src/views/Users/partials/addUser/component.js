import 'rxjs'
import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Field, reduxForm } from 'redux-form'
import UserModel from '../../../../store/user/user-model'
import config from '../../../../config'
import { Redirect, Link } from 'react-router-dom'
import SideNavigation from '../../../../components/sideNavigation'
import TopNavigation from '../../../../components/topNavigation'
import Pagination from 'react-js-pagination'
import Modal from 'react-modal';
import Snackbar from 'material-ui/Snackbar';
import { change } from 'redux-form';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'

import FlatButton from 'material-ui/FlatButton';
const styles = {
      underlineFocusStyle: {
      borderColor: "#009587"
   }
}
const style = {
  height: 600,
  width: 600,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const required = value => value ? '' : <div><p className="error-text">Required <i className="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i></p></div>
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address'
  : ''

const propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  adminPhase: PropTypes.string,
  fetchPhase: PropTypes.string,
  change: PropTypes.func.isRequired,
}


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class AddUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isShowingModal: false,
      buttonState: false,
      id: '',
      openSnackbar: false,
      errMessage:'',
      modalIsOpen: false,
      error: {},
      activePage: 1,
      pageTitle : 'Create User',
      btnName: 'Create',
      btnStatus: false,
    }
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this)
  }

  static contextTypes = {
   router: PropTypes.object
 }

  componentWillMount() {
    const { fetchAdminUser, getUserData } = this.props
    fetchAdminUser(this.state.activePage);
  }
  componentWillReceiveProps(nextProps) {
    const { fetchAdminUser, dispatch, change} = this.props
    if (nextProps.adminPhase === "success") {
      this.setState({ isLoading: true,  errMessage: nextProps.message, openSnackbar: true, btnName: 'Create', btnStatus: false})
    }
    if(nextProps.adminPhase === 'loading'){
      this.setState({btnName: 'Processing', btnStatus: true})
    }
    if(nextProps.adminPhase === "error"){
      document.getElementById("snackbar").classList.add("err");
      this.setState({ isLoading: true,  errMessage: nextProps.message, openSnackbar: true})
    }
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }
  handleRequestClose() {
    this.setState({
      openSnackbar: false,
      errMessage: ''
    })
    const {success} = this.props
    if(success){
      this.context.router.history.push('/users')
    }
  }
  handleAddUser(data){
    const { createAdminUser } = this.props
    createAdminUser(data)
  }
  handleFileupload(e){
    console.log(e.target.value)
  }
  render() {
    const { error, handleSubmit, users, adminPhase, adminCount, adminLimit} = this.props
    return (
      <div id="wrapper">
        <div className="container">
          <div id="school">
            <Paper className="paper-box" style={{padding:'15px',borderRadius:'3px'}} zDepth={1} rounded={false} >
              <div className="page-back-arrow-box">
                <Link to={`/users`} className="page-back-arrow">
                  <img src="img/page-back-arrow.svg"/>
                </Link>
                <span className="page-back-arrow-text">{this.state.pageTitle}</span>
              </div>
              <div className="middle-container">
                <form onSubmit={handleSubmit(this.handleAddUser)}   >
                  <div>
                    <Field
                      component={TextField}
                      underlineFocusStyle={styles.underlineFocusStyle}
                      floatingLabelText="First Name"
                      validate={[ required ]}
                      name="firstName"
                      fullWidth
                    />
                  </div>
                  <div>
                    <Field
                      component={TextField}
                      underlineFocusStyle={styles.underlineFocusStyle}
                      floatingLabelText="Last Name"
                      validate={[ required ]}
                      name="lastName"
                      fullWidth
                    />
                  </div>

                  <div>
                    <Field
                      component={TextField}
                      underlineFocusStyle={styles.underlineFocusStyle}
                       validate={[ required, email ]}
                      floatingLabelText="Email"
                      name="email"

                      fullWidth
                    />
                  </div>
                  <div>
                    <Field
                      type="password"
                      component={TextField}
                      validate={[ required ]}
                      underlineFocusStyle={styles.underlineFocusStyle}
                      floatingLabelText="Password"
                      name="password"
                      fullWidth
                    />
                  </div>
                  <div className="RaisedButton-box">
                    <RaisedButton
                      type="submit"
                      label= {this.state.btnName}
                      primary/>
                  </div>
                </form>
                </div>
              </Paper>

            </div>
          </div>
          <Snackbar
          id="snackbar"
          open={this.state.openSnackbar}
          message={this.state.errMessage}
          autoHideDuration={1000}
          onRequestClose={this.handleRequestClose}
          className="snackbar"
        />
      </div>
    )
  }
}

export default reduxForm({
  form: 'admin',
  destroyOnUnmount: true,
})(AddUser)
