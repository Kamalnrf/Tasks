import React from 'react'
import ActiveTask from '../src/components/ActiveTask'
import {Task} from '../src/types'
import {generateTask} from '../testUtils/generators'
import {fireEvent, render} from '../testUtils/render'

const props = (override?: Partial<Task>) => ({
  onEdit: jest.fn(),
  ...generateTask(),
  ...override,
})

describe('Test Active Task', () => {
  it('should render active task which is not running', () => {
    const _props = props({
      startTime: null,
      endTime: null,
    })
    const {queryByText} = render(<ActiveTask {..._props} />)

    expect(queryByText('Start Task')).not.toBeNull()
    expect(queryByText('Edit Task')).not.toBeNull()
    expect(queryByText(_props.title)).not.toBeNull()
  })
  it('should render active task which is running', () => {
    const _props = props({
      startTime: new Date().toISOString(),
      endTime: null,
    })

    const {queryByText} = render(<ActiveTask {..._props} />)

    expect(queryByText('Mark Completed')).not.toBeNull()
    expect(queryByText('Edit Task')).not.toBeNull()
    expect(queryByText(_props.title)).not.toBeNull()
  })

  it('should trigger onEdit on tapping edit task', () => {
    const _props = props({
      startTime: null,
      endTime: null,
      title: 'New Task',
      tags: [],
      id: '1',
    })
    const {getByText, toJSON} = render(<ActiveTask {..._props} />)

    fireEvent.press(getByText('Edit Task'))
    expect(_props.onEdit).toHaveBeenCalledWith()
    expect(toJSON()).toMatchSnapshot()
  })

  it('should render all tags of the task', () => {
    const _props = props()
    const {getByText} = render(<ActiveTask {..._props} />)

    _props.tags.map((tag) => {
      expect(getByText(tag.name)).not.toBeNull()
    })
  })
})
