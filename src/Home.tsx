import React from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {colors} from './constants'
import ActiveTask from './components/ActiveTask'
import NewTask from './components/NewTask'
import useTasksAndTags from './hooks/useTasksAndTags'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black_212227,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Roboto_700Bold',
    lineHeight: 94,
    fontSize: 30,
    color: colors.white,
  },
  footer: {
    padding: 5,
    marginHorizontal: -10,
    backgroundColor: colors.black_2C2D2F,
  },
  footerText: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 46,
    fontSize: 15,
    color: colors.blue_92A9EC,
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
})

const tasks = [
  {
    title: 'Task Title',
    startTime: new Date(),
    endTime: new Date(),
    id: '1',
  },
]

const Home = () => {
  const {top, bottom} = useSafeAreaInsets()
  const {data} = useTasksAndTags()

  return (
    <>
      <View style={[styles.container, {paddingTop: top}]}>
        <Text style={styles.title}>Tasks</Text>
        <FlatList
          data={data?.tasks}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => <ActiveTask {...item} />}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <Text>Create new task</Text>}
        />
        <View style={[styles.footer, {paddingBottom: bottom}]}>
          <Text style={styles.footerText}>Create Task</Text>
        </View>
      </View>
      <NewTask visible={false} />
    </>
  )
}

export default Home
