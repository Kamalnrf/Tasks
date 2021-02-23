import React, {useState} from 'react'
import {FlatList, StyleSheet, Text, View, TextInput} from 'react-native'
import {colors} from '../constants'
import BottomSheet from './BottomSheet'
import SelectTag from './SelectTag'
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
  visible: boolean
}

const tags = ['first-task', 'delay-post-restar', 'bad', 'go']

const NewTask = ({visible}: Props) => {
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [showAddTag, setShowAddTag] = useState(true)

  if (!visible) return <></>

  return (
    <>
      <BottomSheet>
        <>
          <TextInput
            onChangeText={setTitle}
            placeholder="New Task"
            value={title}
            placeholderTextColor={colors.gray_9C9DA2}
            autoFocus={false}
            style={styles.txtInput}
            returnKeyLabel="Save"
            returnKeyType="done"
            accessibilityRole="combobox"
          />
          <FlatList
            data={tags}
            keyExtractor={(item) => item}
            renderItem={({item}) => <Tag key={item} name={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 10}}
            accessibilityLiveRegion="polite"
          />
          <View style={styles.buttonsContainer}>
            <Text
              style={[
                styles.buttonTxt,
                styles.buttonTxtLink,
                {paddingRight: 10},
              ]}
              onPress={() => setShowAddTag(true)}
            >
              Add Tag
            </Text>
            <Text style={[styles.buttonTxt, styles.buttonTxtLink]}>Save</Text>
          </View>
        </>
      </BottomSheet>
      {showAddTag ? <SelectTag close={() => setShowAddTag(false)} /> : <></>}
    </>
  )
}

export default NewTask
