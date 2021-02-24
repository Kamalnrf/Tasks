import React, {useEffect, useReducer, useState} from 'react'
import {FlatList, StyleSheet, View, TextInput} from 'react-native'
import {colors} from '../constants'
import {Tag as TTag, Task} from '../types'
import BottomSheet from './BottomSheet'
import ArrowLeft from '../../assets/arrow-left.svg'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useMutationInsertTask, useMutationTask} from '../hooks/useTasks'
import Button from './Button'
import {useMutationDeleteTaskTag} from '../hooks/useTags'
import SelectTags from './SelectTags'
import Tag from './Tag'

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  buttonTxt: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 15,
  },
  buttonTxtLink: {
    color: colors.blue_92A9EC,
  },
  txtInput: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    lineHeight: 25,
    color: colors.white,
  },
})

type Props = {
  task?: Task
  onClose: () => void
  isEditing: boolean
}

type State = {
  selectedTags: Array<TTag>
  selectTag: boolean
}

const initialState: State = {
  selectedTags: [],
  selectTag: false,
}

const NewTask = ({task, onClose, isEditing}: Props) => {
  const [title, setTitle] = useState('')
  const [{selectedTags, selectTag}, setState] = useReducer(
    (s: State, a: Partial<State>) => ({...s, ...a}),
    initialState,
  )
  const mutateTask = useMutationTask()
  const mutateInsertTask = useMutationInsertTask()
  const mutateTag = useMutationDeleteTaskTag()

  useEffect(() => {
    if (task?.title) setTitle(task.title)
    if (task?.tags)
      setState({
        selectedTags: task.tags,
      })
  }, [task])

  return (
    <BottomSheet testId="new-task'">
      <TouchableOpacity
        onPress={() => {
          onClose()
        }}
        style={{marginBottom: 10}}
      >
        <ArrowLeft />
      </TouchableOpacity>
      <TextInput
        onChangeText={setTitle}
        placeholder="New Task"
        value={title}
        placeholderTextColor={colors.gray_9C9DA2}
        style={styles.txtInput}
        autoFocus={true}
        returnKeyLabel="Save"
        returnKeyType="done"
        accessibilityLabel={`Task Title ${title}`}
      />
      <FlatList
        data={selectedTags}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => (
          <Tag
            key={item.id}
            name={item.name}
            onDelete={() => {
              if (isEditing && task?.tags.includes(item))
                mutateTag.mutate({
                  tagId: item.id,
                  taskId: task?.id as string,
                })
              else
                setState({
                  selectedTags: selectedTags.filter(
                    (tag) => tag.id !== item.id,
                  ),
                })
            }}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 10}}
        accessibilityLiveRegion="polite"
      />
      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <></>
        ) : (
          <Button
            onPress={() =>
              setState({
                selectTag: true,
              })
            }
          >
            Add Tag
          </Button>
        )}
        <Button
          onPress={async () => {
            if (isEditing) {
              await mutateTask.mutateAsync({
                ...task,
                title,
              })
            } else {
              await mutateInsertTask.mutateAsync({
                task: {
                  title,
                },
                tags: selectedTags.map((tag) => ({
                  tag_id: tag.id,
                })),
              })
            }
            onClose()
          }}
        >
          Save
        </Button>
      </View>
      {selectTag ? (
        <SelectTags
          selectedTags={selectedTags}
          onClose={(selectedTags) => {
            setState({
              selectTag: false,
              selectedTags,
            })
          }}
        />
      ) : (
        <></>
      )}
    </BottomSheet>
  )
}

export default NewTask
