/**
 * Quotes React Native App
 * https://github.com/sasasim/Quotes
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'

import store from './src/store'

import App from './src/app'

export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Quotes', () => AppContainer);
