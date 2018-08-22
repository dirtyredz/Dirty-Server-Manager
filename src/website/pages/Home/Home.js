import React, { Component } from 'react';
// import logo from './logo.svg';
import './Home.css';
import { ContentWrapper } from '../../components'
import {Helmet} from "react-helmet";
import io from 'socket.io-client';


class Home extends Component {
  componentDidMount(){
    const socket = io('http://localhost:3000');
    socket.on('some event', function(msg){
      console.log(msg)
    });
  }
  render() {
    return (
      <ContentWrapper>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <h1>Galaxy: Offline</h1>
        <h2>127.0.0.1</h2>
        <br/>
        <span>Players Online: 0</span>
        <br/>
        <span>Server restarts:</span>
      </ContentWrapper>
    );
  }
}

export default Home;
