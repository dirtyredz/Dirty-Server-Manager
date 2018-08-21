import React, { Component } from 'react';
// import logo from './logo.svg';
import './Alliance.css';
import { ContentWrapper } from '../../components'
import {Helmet} from "react-helmet";

class Alliance extends Component {
  render() {
    return (
      <ContentWrapper>
        <Helmet>
          <title>Alliance</title>
        </Helmet>
        <h1>Alliance</h1>
      </ContentWrapper>
    );
  }
}

export default Alliance;
