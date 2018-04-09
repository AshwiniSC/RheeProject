import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { AppBar } from 'material-ui'
import { Container, Row, Col, } from 'react-grid-system'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/arrow-upward'
import RaisedButton from 'material-ui/RaisedButton';
import SideNavigation from '../../components/sideNavigation';
import Header from '../../components/topNavigation'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import ActionInfo from 'material-ui/svg-icons/navigation/arrow-drop-up'
import './styles.scss'

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  border:'1px solid #000',
};

export default class TopNavigation extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount(){
    localStorage.removeItem('scrollTo')
  }
  componentDidMount(){
    document.title = "RheeProject | Dashboard";
  }
  render() {
    let user = JSON.parse(window.localStorage.getItem("user"))
    const style = {
      margin: 12,
    };
    //let role = user.role[0]
      const currentLocation = location.pathname
    return (
      <div>
          <Header {...this.props}/>
          <br/>
          <br/>
          <div id="wrapper">
            <div className="container">
              <Subheader className="sub-title"></Subheader>
              <Paper style={{borderRadius:'3px'}} zDepth={1} rounded={false} >
               
              </Paper>
            </div>
          </div>
          <br/>
          <br/>
      </div>
    );
  }
}
