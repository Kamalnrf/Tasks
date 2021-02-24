import React from 'react'
import {Text} from 'react-native'
import BottomSheet from '../src/components/BottomSheet'
import {render} from '../testUtils/render'

describe('Test BottomSheet', () => {
  test('should render bottomsheet with passed children', () => {
    const {toJSON} = render(
      <BottomSheet>
        <Text>Hello</Text>
        <Text>BottomSheet</Text>
      </BottomSheet>,
    )

    expect(toJSON()).toMatchSnapshot()
  })
})
