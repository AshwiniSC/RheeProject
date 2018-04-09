import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import SideNavigation from '../../../../components/sideNavigation'
import TopNavigation from '../../../../components/topNavigation'
import $ from 'jquery'
import ReactPaginate from 'react-paginate'
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import faker from 'faker'
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Modal from 'react-modal';
import ReactDOM from 'react-dom'

import {
 Table,
 TableBody,
 TableHeader,
 TableHeaderColumn,
 TableRow,
 TableRowColumn,
} from 'material-ui/Table';
import DeleteConfirm from '../delete-box'

const propTypes = {
  handleSignOut: PropTypes.func.isRequired
}
const listStyles = { paddingTop: 0, paddingBottom: 0 };

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

class ListUsers extends PureComponent {  
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
      pageTitle : 'Create School',
      isloading: false
    }
    this.reset = this.reset.bind(this)
    this.confirm = this.confirm.bind(this)
    
  }
  componentWillMount(){
    if(this.props.match.params.id){
      this.setState({pageTitle: "Edit School"})
    }
    const position = JSON.parse(localStorage.getItem('scrollTo'))
    if(position){
      setTimeout(function() {window.scrollTo(position.x, position.y);},1)
    } 
    const {fetchAdminUser} = this.props
    fetchAdminUser(1);
  }
  componentWillUnmount(){
    const position = {}
    position.x = window.pageXOffset
    position.y = window.pageYOffset
    localStorage.setItem('scrollTo', JSON.stringify(position))
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.fetchPhase === "loading"){
      this.setState({isloading : true})
    }
    if(nextProps.fetchPhase === "success"){
      this.setState({isloading : false})
    }
    if(nextProps.deletePhase === "success"){
      const {fetchAdminUser} = this.props
      fetchAdminUser(1);
    }
  }
  openModal(data){
    this.setState({modalIsOpen: true, deleteId: data})
  }
   closeModal() {
    this.setState({modalIsOpen: false})
  }
  reset() {
    this.setState({
      open: false
    })
  }
  confirm(status) {
    const {deleteUser} = this.props
    const id = this.state.deleteId
    deleteUser(id)
     this.reset()
  }
  delete(id){
    var test  = 'test-'+ id
    var rect = ReactDOM.findDOMNode(this.refs[test]).getBoundingClientRect()
    this.setState({
      open: true,
      deleteId: id
    })
  }

  render() {    
  const current_user = JSON.parse(localStorage.getItem("user"));
  const {users} = this.props 
    return (
      <div id="wrapper">
        <div className="container">
          <DeleteConfirm open={this.state.open}
            reset={this.reset}
            rectRight={this.state.rectRight}
            rectTop={this.state.rectTop}
            confirm={this.confirm}
          />
          <div id="UserManagement">
            <Paper className="paper-box" zDepth={1} rounded={false} >
              <div className="page-back-arrow-box">
                <Link to={`/admindashboard`} className="page-back-arrow">
                  <img src="img/page-back-arrow.svg"/>
                </Link> 
                <span className="page-back-arrow-text">User Management</span>
              </div>
              {this.state.isloading ? <div className="loader"><img src="img/load.gif"/></div> : ''}
              <div className="table-box">
                 <Table selectable={false}>
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow> 
                      <TableHeaderColumn>List of Dashboard Users</TableHeaderColumn>
                      <TableHeaderColumn>
                        <FlatButton containerElement={<Link to="/createUsers" />}
                         className="add-dotts table-add-text"
                         style={{width:'auto'}} 
                         label="ADD" 
                         primary={true} 
                        />
                      </TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {users && users.length > 0 ? users.map((val, index) => {
                      return(
                        <TableRow key = {index}>
                          <TableRowColumn>{val.firstName} {val.lastName}</TableRowColumn>
                            <TableRowColumn>
                              <IconMenu 
                                ref = {'test-' + `${val._id}`}
                                className="add-dotts-td"
                                listStyle={listStyles}
                                iconButtonElement={
                                <IconButton style={{color:'#9B9B9B'}}><MoreVertIcon /></IconButton>
                                }
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                              >
                                <MenuItem 
                                  containerElement={<Link to={`/editUser/${val._id}`} />}
                                  primaryText="Edit " 
                                />
                                {val._id != current_user._id ?
                                  <MenuItem 
                                    primaryText="Delete"
                                    onClick={this.delete.bind(this, val._id)}
                                  /> : ''
                                }
                              </IconMenu>
                            </TableRowColumn>
                          </TableRow>
                        )
                      })
                      : ''
                    }
                  </TableBody>
                </Table>    
              </div>
            </Paper>
        </div>
      </div>           
    </div>
    )
  }
}

export default reduxForm({
  form: 'login', 
  destroyOnUnmount: true,
})(ListUsers)