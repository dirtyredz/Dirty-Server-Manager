import React, { Component } from 'react'
import './SideBar.css'
import { Link } from "react-router-dom";
import { Icons } from '../'

export default class SideBar extends Component {
  render() {
    return (
      <div className="SideBar">
        <header>DSM</header>
        <Link to="/"><Icons.ServerRack/><span>HOME</span></Link>
        <Link to="/Console"><Icons.Console/><span>CONSOLE</span></Link>
        <Link to="/Factions"><Icons.Earth/><span>FACTIONS</span></Link>
        <Link to="/Players"><Icons.Players/><span>PLAYERS</span></Link>
        <Link to="/Alliance"><Icons.Flag/><span>ALLIANCE</span></Link>
        <Link to="/Maps"><Icons.Map/><span>MAPS</span></Link>
        <Link to="/Graphs"><Icons.Graph/><span>GRAPHS</span></Link>
        <Link to="/SpaceInvaders"><Icons.SpaceInvaders/><span>SPACE INVADERS</span></Link>
        <Link to="/Account"><Icons.Enter/><span>SIGN IN</span></Link>
        <Link to="/About"><Icons.About/><span>ABOUT</span></Link>
      </div>
    )
  }
}
