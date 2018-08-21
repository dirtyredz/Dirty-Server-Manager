import React, { Component } from 'react';
// import logo from './logo.svg';
import './Home.css';
import { ContentWrapper } from '../../components'
import {Helmet} from "react-helmet";

class Home extends Component {
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
