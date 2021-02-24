import React from 'react'
import Button from '../src/components/Button'
import {fireEvent, render} from '../testUtils/render'

describe('Test Button', () => {
  it('should render button with given text and to be tapable', () => {
    const onPress = jest.fn()
    const {toJSON, queryByA11yRole} = render(
      <Button onPress={onPress}>Test Button</Button>,
    )

    fireEvent.press(queryByA11yRole('button'))
    expect(onPress).toHaveBeenCalledWith()
    expect(toJSON()).toMatchSnapshot()
  })
})
