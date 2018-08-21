import React, { Component } from 'react';
// import logo from './logo.svg';
import './Players.css';
import { ContentWrapper } from '../../components'
import {Helmet} from "react-helmet";

class Players extends Component {
  render() {
    return (
      <ContentWrapper>
        <Helmet>
          <title>Players</title>
        </Helmet>
        <h1>Players</h1>
      </ContentWrapper>
    );
  }
}

export default Players;
