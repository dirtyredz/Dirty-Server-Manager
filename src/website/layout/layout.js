import React, { Component } from 'react';
import { SideBar, PageWrapper } from '../components'
import {Helmet} from "react-helmet";

class Layout extends Component {
  render() {
    return (
      <PageWrapper>
        <Helmet>
          <meta charSet="utf-8" />
        </Helmet>
        <SideBar/>
        {this.props.children}
      </PageWrapper>
    );
  }
}

export default Layout;
