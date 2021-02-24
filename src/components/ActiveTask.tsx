import React from 'react'
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {colors} from '../constants'
import {useMutationTask} from '../hooks/useTasks'
import {Task} from '../types'
import Button from './Button'
import Tag from './Tag'
import TimeProgress from './TimeProgreess'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black_2C2D2F,
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
  },
  taskDetailsContainer: {
    flex: 1,
    marginLeft: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  buttonTxt: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 15,
  },
  titleTxt: {
    color: colors.white,
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
    lineHeight: 30,
  },
  buttonTxtLink: {
    color: colors.blue_92A9EC,
  },
})

const _isTaskRunning = (endTime: string | null, startTime: string | null) => {
  if (startTime === null) return false
  if (Date.parse(endTime as string) > Date.parse(startTime)) return false

  return true
}

type Props = Task & {
  onEdit: () => void
}

const ActiveTask = ({title, startTime, tags, endTime, id, onEdit}: Props) => {
  const isTaskRunning = _isTaskRunning(endTime, startTime)
  const {mutate} = useMutationTask()

  const startTask = () =>
    mutate({
      endTime,
      startTime: new Date().toISOString(),
      title,
      id,
    })

  const stopTask = () =>
    mutate({
      endTime: new Date().toISOString(),
      startTime,
      title,
      id,
    })

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (isTaskRunning) stopTask()
          else startTask()
        }}
      >
        <TimeProgress isTaskRunning={isTaskRunning} startTime={startTime} />
      </TouchableOpacity>
      <View style={styles.taskDetailsContainer}>
        <Text style={styles.titleTxt}>{title}</Text>
        <FlatList
          data={tags}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => <Tag key={item.id} name={item.name} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            marginRight: -20,
          }}
        />
        <View style={styles.buttonsContainer}>
          {isTaskRunning ? (
            <Button onPress={stopTask}>Mark Completed</Button>
          ) : (
            <Button onPress={startTask}>Start Task</Button>
          )}
          <Button onPress={onEdit}>Edit Task</Button>
        </View>
      </View>
    </View>
  )
}

export default ActiveTask
