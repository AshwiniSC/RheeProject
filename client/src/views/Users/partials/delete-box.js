import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import SideNavigation from '../../../components/sideNavigation'
import TopNavigation from '../../../components/topNavigation'
import $ from 'jquery'
import ReactPaginate from 'react-paginate'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ContentFilter from 'material-ui/svg-icons/content/filter-list'
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward'
import FileFileDownload from 'material-ui/svg-icons/file/file-download'
import FlatButton from 'material-ui/FlatButton'
import '../styles.scss'

export default class DeleteConfirm extends PureComponent {  
  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
    this.confirm = this.confirm.bind(this)
  }
  
  close(){
    this.props.reset(false)
  }
  
  confirm(){
    this.props.confirm(true)
  }
  
  render() {  
    return (
      <div className="deleteComponent" >
          {this.props.open &&

            <div className="deleteComponent-box">
              <p> Are you sure want to delete?</p>
              <div className="cancel-delete-btn-grp">
                <RaisedButton className="cancel-btn"
                onClick={this.close.bind(this)}
                label="Cancel"   
                primary={true}
                />
                &nbsp;
                &nbsp;
                <RaisedButton className="delete-btn" 
                onClick={this.confirm.bind(this)}
                primary={true}
                label="Delete"                
                />                         
              </div> 
            </div>
          }
      </div>
    )
  }
}