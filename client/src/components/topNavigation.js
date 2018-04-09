import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { AppBar } from 'material-ui'
import { Container, Row, Col, } from 'react-grid-system'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';



export default class TopNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false};
  }
  
  handleToggle() {
    this.setState({open: !this.state.open})
  }

  handleSignouts(event) {
    const { handleSignOut } = this.props
    handleSignOut()
  }


  render() {
    let user = JSON.parse(window.localStorage.getItem("user"))
    //let role = user.role[0]
    const currentLocation = location.pathname
    const style = {
      margin: 12,
    };
    const sideComponentsStyle = {
      borderBottom: 'solid 1px',
      width: '100%',
      listStyle: 'none',
      padding: '10px',
      cursor: 'pointer'
    }
    const Logged = (props) => (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        <MenuItem primaryText="Profile" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" onClick={this.handleSignouts.bind(this)} />
      </IconMenu>
    );
    Logged.muiName = 'IconMenu';

    return (
      <div>
        <div id="topbar-wrapper" style={{textAlign: 'center'}}>
          <AppBar
            showMenuIconButton={true}
            style={{backgroundColor: '#3B3B3B', boxShadow: '0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24)'}}
            title={<Link to =""><span style={{fontSize:'20px',letterSpacing:'1.17px', color: '#fff'}}>Rhee-Project</span></Link>}
            titleStyle={{fontSize:'18px'}}
            iconElementRight={this.state.logged ? <Logged /> : <Logged />}
            iconElementLeft={<IconButton onClick={this.handleToggle.bind(this)}>
                                <ActionHome />
                              </IconButton>}
          />

          <Drawer width={200} openSecondary={false} open={this.state.open} >
            <AppBar title="Brand Name"
              style={{backgroundColor: '#3B3B3B', boxShadow: '0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24)'}}
              iconElementLeft={<IconButton onClick={this.handleToggle.bind(this)}>
                                <ActionHome />
                              </IconButton>}
            />
            <ul style={{padding: '0', margin: '0', textAlign: 'left'}}>
              <li style={sideComponentsStyle}>
                Popular Guru's
              </li>
              <li style={sideComponentsStyle}>
                Popular Universities
              </li>
            </ul>
          </Drawer>
        </div>
      </div>
    );
  }
}
