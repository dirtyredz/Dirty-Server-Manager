import React, { Component } from 'react'
import './ContentWrapper.css'
import { Header } from '../'

export default class ContentWrapper extends Component {
  render() {
    let fillStyle = this.props.fill ? {padding: 0, minHeight: "calc(100vh - 75px)"}: {padding: 10, minHeight: "calc(100vh - 95px)"}
    if(this.props.exact){
      fillStyle.maxHeight = fillStyle.minHeight
      fillStyle.maxWidth = "calc(100vw - 200px)"
    }
    return (
      <div className="ContentWrapper">
        <Header height={75}/>
        <div className="Content" style={{...this.props.style, ...fillStyle }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
