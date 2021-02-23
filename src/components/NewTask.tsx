import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, Text, View, TextInput} from 'react-native'
import {colors} from '../constants'
import {Task} from '../types'
import BottomSheet from './BottomSheet'
import SelectTag from './SelectTag'
import Tag from './Tag'
import ArrowLeft from '../../assets/arrow-left.svg'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useMutationTask, useTasks} from '../hooks/useTasks'
import Button from './Button'
import {useMutationDeleteTaskTag} from '../hooks/useTags'

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
  visible: boolean
  task?: Task
  onClose: () => void
}

const NewTask = ({visible, task, onClose}: Props) => {
  const [title, setTitle] = useState(task?.title ?? '')
  const [showAddTag, setShowAddTag] = useState(false)
  const mutateTask = useMutationTask()
  const mutateTag = useMutationDeleteTaskTag()

  useEffect(() => {
    if (task?.title) setTitle(task.title)
  }, [task])

  if (!visible) return <></>

  return (
    <>
      <BottomSheet>
        <>
          <TouchableOpacity onPress={onClose} style={{marginBottom: 10}}>
            <ArrowLeft />
          </TouchableOpacity>
          <TextInput
            onChangeText={setTitle}
            placeholder="New Task"
            value={title}
            placeholderTextColor={colors.gray_9C9DA2}
            autoFocus={true}
            style={styles.txtInput}
            returnKeyLabel="Save"
            returnKeyType="done"
            accessibilityRole="combobox"
          />
          <FlatList
            data={task?.tags ?? []}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => (
              <Tag
                key={item.id}
                name={item.name}
                onDelete={() => {
                  mutateTag.mutate({
                    tagId: item.id,
                    taskId: task?.id as string,
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
            <Button onPress={() => setShowAddTag(true)}>Add Tag</Button>
            <Button
              onPress={async () => {
                await mutateTask.mutateAsync({
                  ...task,
                  title,
                })
                onClose()
              }}
            >
              Save
            </Button>
          </View>
        </>
      </BottomSheet>
      {showAddTag ? <SelectTag close={() => setShowAddTag(false)} /> : <></>}
    </>
  )
}

export default NewTask
