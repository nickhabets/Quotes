import React from 'react'
import { shallow } from 'enzyme'

import <%= componentName %> from '../'

describe('<%= componentName %>', () => {
  it('renders without crashing', () => {
    shallow(
      <<%= componentName %>><%= componentName %></<%= componentName %>>
    )
  })
})
