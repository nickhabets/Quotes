/**
 * Created by Sasa on 5/13/17.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import QuotesView from './views/quotesView'
import { initDB } from './store/sqlite'

export default class App extends Component {
  
  componentWillMount() {
    initDB()
  }
  
  render() {
    return (
      <QuotesView/>
    );
  }
}
