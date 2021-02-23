import React from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import {colors} from '../constants'
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

type Props = {
  title: string
  startTime: Date
  endEnd: Date
  tags: Array<string>
}

const tags = ['first-task', 'delay-post-restar', 'bad', 'go']

const ActiveTask = ({title, startTime}: Props) => (
  <View style={styles.container}>
    <TimeProgress startTime={startTime} />
    <View style={styles.taskDetailsContainer}>
      <Text style={styles.titleTxt}>{title}</Text>
      <FlatList
        data={tags}
        keyExtractor={(item) => item}
        renderItem={({item}) => <Tag key={item} name={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginRight: -20,
        }}
      />
      <View style={styles.buttonsContainer}>
        <Text
          style={[styles.buttonTxt, styles.buttonTxtLink, {paddingRight: 10}]}
        >
          Mark Completed
        </Text>
        <Text style={[styles.buttonTxt, styles.buttonTxtLink]}>Edit Task</Text>
      </View>
    </View>
  </View>
)

export default ActiveTask
