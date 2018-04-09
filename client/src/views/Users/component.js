import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import SideNavigation from '../../components/sideNavigation'
import TopNavigation from '../../components/topNavigation'
import $ from 'jquery'
import ReactPaginate from 'react-paginate'

import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import faker from 'faker'
import ListUser from './partials/listUser/component'
import AddUser from './partials/addUser/component'
import EditUser from './partials/editUser/component'


const propTypes = {
  handleSignOut: PropTypes.func.isRequired
}

export default class Users extends PureComponent {  
  constructor(props) {
    super(props)
    
  }
  
  render() {     
    return (
      <div>
        <TopNavigation {...this.props}/> 
        <div className="container"> 
        {this.props.location.pathname === '/users' && <ListUser {...this.props}/>}
        {this.props.location.pathname.indexOf('/createUsers') !== -1 && <AddUser {...this.props}/>}
        {this.props.location.pathname.indexOf('/editUser') !== -1 && <EditUser {...this.props}/>}
        </div>
      </div>   
    )
  }
}
