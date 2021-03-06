import {gql} from 'graphql-request'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import graphQLClient from '../graphQLClient'
import {Tag, Task} from '../types'

const useTags = () => {
  return useQuery('tags', async () => {
    try {
      const {tags} = await graphQLClient.request(gql`
        query {
          tags {
            id
            name
          }
        }
      `)

      return {
        tags,
      } as {tags: Array<Tag>}
    } catch (err: unknown) {
      return Promise.reject(err)
    }
  })
}

const useMutationDeleteTaskTag = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({taskId, tagId}: {tagId: string; taskId: string}) => {
      try {
        const data: {
          delete_task_tag: {
            returning: Array<{
              task: Task
            }>
          }
        } = await graphQLClient.request(gql`
          mutation {
            delete_task_tag(where: {tag_id: {_eq: ${tagId}}, task_id: {_eq: ${taskId}}}) {
              affected_rows
              returning {
                task {
                  id
                  title
                  startTime: start_time
                  endTime: end_time
                  tags {
                    id
                    name
                  }
                }
              }
            }
          }
        `)

        return data.delete_task_tag.returning[0]
      } catch (err: unknown) {
        return Promise.reject(err)
      }
    },
    {
      onSuccess: (newData) => {
        queryClient.setQueryData('tasks', (data: {tasks: Array<Task>}) => {
          const newTasks = data.tasks.map((task: Task) => {
            if (task.id === newData.task.id) return newData.task
            return task
          })

          return {
            tasks: newTasks,
          }
        })
      },
    },
  )
}

export {useTags, useMutationDeleteTaskTag}
