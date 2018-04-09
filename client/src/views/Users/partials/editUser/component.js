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
      "borderColor": "#009587"
   }
}
const style = {
  height: 600,
  width: 600,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


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

const required = value => value ? '' : <div><p className="error-text">Required <i className="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i></p></div>
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : ''

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
      pageTitle : 'Edit User',
      btnStatus: false,
      btnName: 'Update',

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
    if(this.props.match.params.id){
      getUserData(this.props.match.params.id)
      this.setState({id: this.props.match.params.id})

    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchAdminUser, dispatch, change, clearPhase} = this.props
    if (nextProps.adminPhase === "success") {
      this.setState({ isLoading: true,  errMessage: nextProps.message, openSnackbar: true, btnName: 'Update' , btnStatus: false})
    }
    if(nextProps.adminPhase === "error"){
      this.setState({ isLoading: true,  errMessage: nextProps.message, openSnackbar: true})
      document.getElementById("snackbar").classList.add("err");
    }
    if(nextProps.adminPhase === "loading"){
      this.setState({btnName: 'Processing' , btnStatus: true})
    }
    if(nextProps.dataPhase === "success"){
      change('firstName', nextProps.userdata.firstName)
      change('lastName', nextProps.userdata.lastName)
      change('email', nextProps.userdata.email)
      clearPhase()
    }
  }

  handleChange(e){
    if(this.state.btnStatus){
      this.setState({ btnStatus: false })
    }
  }
  handleRequestClose() {
    this.setState({
      openSnackbar: false,
      errMessage: ''
    })
    const {adminPhase} = this.props
    if(adminPhase === "success"){
      this.context.router.history.push('/users')
    }
  }
  handleAddUser(data){
    data.id = this.state.id
    const { updateUser } = this.props
    updateUser(data)
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

                <form onSubmit={handleSubmit(this.handleAddUser)}>
                <div className="middle-container">
                  <div>
                    <Field
                      component={TextField}
                      underlineFocusStyle={styles.underlineFocusStyle}
                      floatingLabelText="First Name"
                      validate={[ required ]}
                      onKeyUp={this.handleChange.bind(this)}
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
                      onKeyUp={this.handleChange.bind(this)}
                      name="lastName"
                      fullWidth
                    />
                  </div>

                  <div>
                    <Field
                      component={TextField}
                      underlineFocusStyle={styles.underlineFocusStyle}
                      floatingLabelText="Email"
                      validate={[ required, email]}
                      name="email"
                      fullWidth
                      readOnly
                    />
                  </div>
                  <br/>
                  <div className="RaisedButton-box">
                    <RaisedButton
                      type="submit"
                      label={this.state.btnName}
                      disabled = {this.state.btnStatus}
                      primary
                    />
                  </div>
                </div>
                </form>

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
