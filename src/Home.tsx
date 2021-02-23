import React, {useState} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {colors} from './constants'
import ActiveTask from './components/ActiveTask'
import NewTask from './components/NewTask'
import Button from './components/Button'
import {useTasks} from './hooks/useTasks'

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

const Home = () => {
  const {top, bottom} = useSafeAreaInsets()
  const {editTask, setEditTask} = useState(null)
  const [isCreatingTask, setCreatingTask] = useState(false)
  const {data} = useTasks()

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
          <Button onPress={() => {}}>Create Task</Button>
        </View>
      </View>
      <NewTask visible={isCreatingTask || editTask} />
    </>
  )
}

export default Home
