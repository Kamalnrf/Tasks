import React from 'react'
import faker from 'faker'
import Tag from '../src/components/Tag'
import {fireEvent, render} from '../testUtils/render'

const props = (override = {}) => ({
  name: faker.name.title(),
  onDelete: jest.fn(),
  ...override,
})

describe('Test SelectTags Component', () => {
  it('should render', () => {
    const _props = props()
    const {queryByText, queryByA11yRole} = render(<Tag {..._props} />)

    expect(queryByText(_props.name)).not.toBeNull()

    fireEvent.press(queryByA11yRole('button'))
    expect(_props.onDelete).toHaveBeenCalledWith()
  })
})
