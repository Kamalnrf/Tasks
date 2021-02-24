import faker from 'faker'
import {Tag, Task} from '../src/types'

function generateList<T>(fn: (override?: {}) => T) {
  return (n: number): Array<T> =>
    new Array(n).fill('').reduce((acc, _) => [...acc, fn()])
}

export const generateTag = (override = {}): Tag => ({
  id: faker.random.uuid(),
  name: faker.name.title(),
  ...override,
})

export const generateTags = generateList<Tag>(generateTag)

export const generateTask = (override = {}): Task => ({
  id: faker.random.uuid(),
  endTime: faker.date.recent().toISOString(),
  startTime: faker.date.past().toISOString(),
  tags: generateTags(10),
  title: faker.name.title(),
  ...override,
})
