/**
 * Created by Sasa on 5/14/17.
 */

import React, { Component, PropTypes } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image
} from 'react-native'

export const MARGINX = 0.06
export const MARGINY = 0.2
const { width, height } = Dimensions.get('window')

export default class Card extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={styles.container}
        shadowColor={'#222'}
        shadowOffset={{ width: 0, height: 0 }}
        shadowRadius={4}
        shadowOpacity={0.4}
      >
        <View style={styles.textArea}>
          <Text style={styles.text}>
            {
              this.props.text
            }
          </Text>
        </View>
        <View
          style={{
            height: 64,
            padding: 8,
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Image
            source={{ uri: this.props.author.photoUrl }}
            style={styles.avatar}
          />
          <View
            style={
              {
                flex: 1,
                paddingTop: 4,
                paddingLeft: 16
              }
            }
          >
            <Text style={styles.authorName}>
              {this.props.author.name}
            </Text>
            <Text style={styles.authorTitle}>
              {this.props.author.title}
            </Text>

          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: width * (1.0 - MARGINX * 2),
    height: height * (1.0 - MARGINY * 2.1),
    marginLeft: width * MARGINX,
    marginTop: height * MARGINY,
    backgroundColor: 'white',
    borderRadius: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  textArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  authorName: {
    fontSize: 18
  },
  authorTitle: {
    color: 'gray'
  },
  text: {
    fontSize: 32,
    fontFamily: 'OpenSans-Italic'
  }
});
