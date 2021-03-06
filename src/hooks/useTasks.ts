import {gql} from 'graphql-request'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import graphQLClient from '../graphQLClient'
import {Tag, Task} from '../types'

const useTasks = () => {
  return useQuery('tasks', async () => {
    try {
      const {
        tasks,
      }: {
        tasks: Array<Task>
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
        }
      `)

      return {
        tasks,
      }
    } catch (err: unknown) {
      return Promise.reject(err)
    }
  })
}

const useMutationTask = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({startTime, endTime, title, id}: Partial<Task>) => {
      try {
        const data: {
          update_tasks: {
            returning: Array<Task>
          }
        } = await graphQLClient.request(gql`
          mutation {
            update_tasks(
              _set: {
                start_time: ${startTime ? `"${startTime}"` : null}
                end_time: ${endTime ? `"${endTime}"` : null}
                title: ${title ? `"${title}"` : null}
              }
              where: {id: {_eq: ${id}}}
            ) {
              affected_rows
              returning {
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
        `)

        return data.update_tasks.returning[0]
      } catch (err: unknown) {
        return Promise.reject(err)
      }
    },
    {
      onSuccess: (newTask) => {
        queryClient.setQueryData('tasks', (data) => {
          const newTasks = data.tasks.map((task: Task) => {
            if (task.id === newTask.id) return newTask
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

const useMutationInsertTask = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({
      task: {title},
      tags,
    }: {
      task: Partial<Task>
      tags: Array<{
        tag_id: string
      }>
    }) => {
      try {
        const data: {
          update_tasks: {
            returning: Array<Task>
          }
        } = await graphQLClient.request(gql`
          mutation {
            insert_tasks(
              objects: {
                title: "${title}"
                task_tags: {
                  data: ${JSON.stringify(tags).replace(/"([^(")"]+)":/g, '$1:')}
                }
              }
            ) {
              returning {
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
        `)

        return data.insert_tasks.returning[0]
      } catch (err: unknown) {
        return Promise.reject(err)
      }
    },
    {
      onSuccess: (newTask) => {
        queryClient.setQueryData('tasks', (data) => ({
          tasks: [...(data?.tasks ?? []), newTask],
        }))
      },
    },
  )
}

export {useTasks, useMutationTask, useMutationInsertTask}
