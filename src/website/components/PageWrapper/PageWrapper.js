import React, { Component } from 'react'
import './PageWrapper.css'

export default class PageWrapper extends Component {
  render() {
    return (
      <div className="PageWrapper">
        {this.props.children}
      </div>
    )
  }
}
