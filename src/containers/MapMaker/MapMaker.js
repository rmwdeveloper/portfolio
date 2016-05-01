import React, { Component } from 'react';

export default class About extends Component {
  render() {
    const styles = require('./MapMaker.scss');
    return (
      <div className="container-fluid">
        <div className="row">
          <div id={styles.leftSidebar} className="col-md-1">
          </div>
          <div className="col-md-11">
          </div>
        </div>
      </div>
    );
  }
}
