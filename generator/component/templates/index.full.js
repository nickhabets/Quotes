import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import {
  View,
  Text
} from 'react-native'

const COMPONENT_CLASSNAME = '<%= projectCSSPrefix %>-<%= componentName %>'

export default class <%= componentName %> extends Component {

  static propTypes = {
    // PropTypes go here
  }

  static defaultProps = {
    // Default Props go here
  }

  render() {
    return (
      <View>
        <Text>{COMPONENT_CLASSNAME}</Text>
      </View>
    )
  }

}
