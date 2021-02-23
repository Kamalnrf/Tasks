import {gql} from 'graphql-request'
import {useQuery} from 'react-query'
import graphQLClient from '../graphQLClient'
import {Tag, Task} from '../types'

const useTasksAndTags = () => {
  return useQuery('tasks', async () => {
    try {
      const {
        tasks,
        tags,
      }: {
        tasks: Array<Task>
        tags: Array<Tag>
      } = await graphQLClient.request(gql`
        query {
          tasks {
            id
            title
            startTime: start_time
            endTime: end_time
            tags {
              id
              name
            }
          }
          tags {
            name
            id
          }
        }
      `)

      return await Promise.resolve({
        tasks,
        tags,
      })
    } catch (err: unknown) {
      return Promise.reject(err)
    }
  })
}

export default useTasksAndTags
