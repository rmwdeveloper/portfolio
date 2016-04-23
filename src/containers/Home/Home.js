import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { FlatSurfaceShader } from 'components';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <FlatSurfaceShader refreshDuration={10000} />
      </div>
    );
  }
}
