/**
 * Created by Sasa on 5/13/17.
 */

import React, { Component, PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import SwipeCards from 'react-native-swipe-cards'

import Card from '../components/card'
import NoMoreCards from '../components/noMoreCards'

const { width, height } = Dimensions.get('window')

const Cards = [
  {
    text: '“Does it better” will always beat “did it first.”',
    author: {
      name: 'Aaron Levie',
      title: 'CEO at Box',
      photoUrl: 'https://s9.postimg.org/es5cxwynj/photo.png'
    }
  }
]

export default class QuotesView extends Component {

  static propTypes = {
    cards: PropTypes.array
  }

  static defaultProps = {
    cards: Cards
  }

  render() {

    const { cards } = this.props
    return (
      <View style={styles.container}>
        <Image
          source={require('../res/img/background.png')}
          style={styles.background}
        />
        <SwipeCards
          cards={cards}
          cardKey={'text'}
          renderCard={(cardData) => <Card {...cardData}/>}
          renderNoMoreCards={() => <NoMoreCards />}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          handleMaybe={this.handleMaybe}
          showYup={false}
          showNope={false}
          stackOffsetX={0}
          stackOffsetY={-10}
          hasMaybeAction
          stack
        />
        <View style={styles.shareView}>
          <TouchableOpacity
            style={styles.facebook}
          >
            <Image
              source={require('../res/img/facebook.png')}
              style={{
                height: 64,
                width: 64
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.twitter}
          >
            <Image source={require('../res/img/twitter.png')}
              style={{
                height: 64,
                width: 64
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  handleYup (card) {
  }

  handleNope (card) {
  }

  handleMaybe (card) {
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width,
    height
  },
  shareView: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    height: 128,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: width * 0.25,
    paddingRight: width * 0.25
  },
  facebook: {
    flex: 1,
    alignItems: 'center'
  },
  twitter: {
    flex: 1,
    alignItems: 'center'
  }

})
