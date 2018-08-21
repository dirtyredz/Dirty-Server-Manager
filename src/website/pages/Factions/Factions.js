import React, { Component } from 'react';
// import logo from './logo.svg';
import './Factions.css';
import { ContentWrapper } from '../../components'
import {Helmet} from "react-helmet";

class Factions extends Component {
  render() {
    return (
      <ContentWrapper>
        <Helmet>
          <title>Factions</title>
        </Helmet>
        <h1>Factions</h1>
      </ContentWrapper>
    );
  }
}

export default Factions;
