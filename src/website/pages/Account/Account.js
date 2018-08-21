import React, { Component } from 'react';
// import logo from './logo.svg';
import './Account.css';
import { ContentWrapper } from '../../components'
import {Helmet} from "react-helmet";

class Account extends Component {
  render() {
    return (
      <ContentWrapper>
        <Helmet>
          <title>Account</title>
        </Helmet>
        <h1>Account</h1>
      </ContentWrapper>
    );
  }
}

export default Account;
