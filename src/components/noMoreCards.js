/**
 * Created by Sasa on 5/15/17.
 */
import React, { Component, PropTypes } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions
} from 'react-native'

export default class NoMoreCards extends Component {

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more quotes</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  }
});
