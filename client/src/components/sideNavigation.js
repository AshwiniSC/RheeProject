import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { AppBar } from 'material-ui'
import { Container, Row, Col, } from 'react-grid-system'

export default class SideNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false}; 
  }

  render() {
    let user = JSON.parse(window.localStorage.getItem("user"))
    //let role = user.role[0]
    const currentLocation = location.pathname
    return (
      <div>
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li><Link to="/university" className="active" >universities form</Link></li>
            <li><Link  to="/universities" className="active">Universities</Link></li>
            {/*<li><Link to="/playlist"className="active" className={currentLocation == '/playlist' || currentLocation.indexOf('ss/') !== -1 ? 'active' :''}><img src="img/playlist-ic.svg"/>View Playlist</Link></li>
            <li><Link to="/genre" className="active" className={currentLocation == '/genre' || currentLocation.indexOf('genre/') !== -1 ? 'active' :''}><img src="img/genrestags-ic.svg"/>View Genres/Tags</Link></li>
            <li><Link to="/app_users"  className="active" className={currentLocation =='/app_users' ? 'active' :''}><img src="img/app-ic.svg"/>Find App Users</Link></li>                        
            <li><Link to="/list_campaign" className="active"  className={currentLocation =='/list_campaign' ? 'active' :''}><img src="img/campaigns-ic.svg"/>Ad Campaigns</Link></li>
            <li className="active" ><a href='https://mixpanel.com/' target='_blank'><img src="img/notifications-ic.svg"/>Push Notifications</a></li>
            {role === "superadmin"  ?
            <li><Link to="/admin" className="active" className={currentLocation =='/admin' ? 'active' :''}><img src="img/mgmt-ic.svg"/>Dashboard User Mgmt</Link></li>  : '' }
            <li><Link to="/settings" className="active"  className={currentLocation =='/settings' ? 'active' :''}><img src="img/settings-ic.svg"/>General Settings</Link></li>*/}
          </ul>
        </div>      
      </div>              
    );
  }
}