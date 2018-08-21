import React, { Component } from 'react';
// import logo from './logo.svg';
import './Graphs.css';
import { ContentWrapper } from '../../components'
import {Helmet} from "react-helmet";

class Graphs extends Component {
  render() {
    return (
      <ContentWrapper>
        <Helmet>
          <title>Graphs</title>
        </Helmet>
        <h1>Graphs</h1>
      </ContentWrapper>
    );
  }
}

export default Graphs;
