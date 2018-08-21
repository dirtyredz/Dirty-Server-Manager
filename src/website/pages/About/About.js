import React, { Component } from 'react';
// import logo from './logo.svg';
import './About.css';
import { ContentWrapper } from '../../components'
import {Helmet} from "react-helmet";

class About extends Component {
  render() {
    return (
      <ContentWrapper>
        <Helmet>
          <title>About</title>
        </Helmet>
        <h1>About</h1>
      </ContentWrapper>
    );
  }
}

export default About;
