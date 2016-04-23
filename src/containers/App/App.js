import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { routeActions } from 'react-router-redux';
import config from '../../config';


@connect(
  state => ({user: state.auth.user}),
  {pushState: routeActions.push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <div>
          {this.props.children}
        </div>

      </div>
    );
  }
}
