import React, { Component } from 'react';
// import logo from './logo.svg';
import './SpaceInvaders.css';
import { ContentWrapper } from '../../components'
import {Helmet} from "react-helmet";

class SpaceInvaders extends Component {
  render() {
    return (
      <ContentWrapper>
        <Helmet>
          <title>SpaceInvaders</title>
        </Helmet>
        <h1>SpaceInvaders</h1>
      </ContentWrapper>
    );
  }
}

export default SpaceInvaders;
