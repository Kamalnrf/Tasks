type Task = {
  id: string
  title: string
  startTime: string | null
  endTime: string | null
  tags: Array<Tag>
}

type Tag = {
  name: string
  id: string
}

export {Task, Tag}
