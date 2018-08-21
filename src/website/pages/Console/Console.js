import React, { Component } from 'react';
// import logo from './logo.svg';
import './Console.css';
import { ContentWrapper } from '../../components'
import {Helmet} from "react-helmet";

class Console extends Component {
  render() {
    return (
      <ContentWrapper>
        <Helmet>
          <title>Console</title>
        </Helmet>
        <h1>Console</h1>
      </ContentWrapper>
    );
  }
}

export default Console;
