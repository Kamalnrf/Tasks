import React from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import {colors} from '../constants'
import {Task} from '../types'
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
  if (startTime && !endTime) return true
  else if (Date.parse(endTime as string) > Date.parse(startTime as string))
    return true
  return false
}

const ActiveTask = ({title, startTime, tags, endTime}: Task) => {
  const isTaskRunning = _isTaskRunning(endTime, startTime)

  return (
    <View style={styles.container}>
      <TimeProgress
        isTaskRunning={isTaskRunning}
        startTime={isTaskRunning ? new Date(startTime as string) : null}
      />
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
            <Text
              style={[
                styles.buttonTxt,
                styles.buttonTxtLink,
                {paddingRight: 10},
              ]}
            >
              Stop Task
            </Text>
          ) : (
            <Text
              style={[
                styles.buttonTxt,
                styles.buttonTxtLink,
                {paddingRight: 10},
              ]}
            >
              Mark Completed
            </Text>
          )}
          <Text style={[styles.buttonTxt, styles.buttonTxtLink]}>
            Edit Task
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ActiveTask
