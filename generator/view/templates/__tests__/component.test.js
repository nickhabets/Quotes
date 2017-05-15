import React from 'react'
import { shallow } from 'enzyme'

import <%= viewName %> from '../component'

it('renders without crashing', () => {
  shallow(
    <<%= viewName %> />
  )
})
