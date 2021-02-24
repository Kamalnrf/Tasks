import React, {useReducer} from 'react'
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

/*
 TODO
 [ ] - Add E2E Tests
 [ ] - Add Tasks Search
 [ ] - Add Date Range Filter
*/

type State = {
  editingTaskId: string | undefined
  createNewTask: boolean
}

const initialState: State = {
  editingTaskId: undefined,
  createNewTask: false,
}

const Home = () => {
  const {top, bottom} = useSafeAreaInsets()
  const [state, setState] = useReducer(
    (s: State, a: Partial<State>) => ({...s, ...a}),
    initialState,
  )
  const {data} = useTasks()

  return (
    <>
      <View style={[styles.container, {paddingTop: top}]}>
        <Text style={styles.title}>Tasks</Text>
        <FlatList
          data={data?.tasks}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <ActiveTask
              {...item}
              onEdit={() =>
                setState({
                  editingTaskId: item.id,
                })
              }
            />
          )}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Button
              onPress={() => {
                setState({
                  createNewTask: true,
                })
              }}
              textStyle={{
                alignSelf: 'center',
                fontSize: 20,
              }}
            >
              Create new task +
            </Button>
          )}
        />
        <View style={[styles.footer, {paddingBottom: bottom}]}>
          <Button
            onPress={() => {
              setState({
                createNewTask: true,
              })
            }}
          >
            Create Task
          </Button>
        </View>
      </View>
      {!!state.editingTaskId || state.createNewTask ? (
        <NewTask
          task={data?.tasks?.find((task) => task.id === state.editingTaskId)}
          isEditing={!!state.editingTaskId}
          onClose={() =>
            setState({
              editingTaskId: undefined,
              createNewTask: false,
            })
          }
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default Home
