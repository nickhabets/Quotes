import { connect } from 'react-redux'

import <%= viewName %>Component from './component'

const <%= viewName %>Container = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(<%= viewName %>Component)

export default <%= viewName %>Container
