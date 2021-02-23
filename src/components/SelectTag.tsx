import React, {useState} from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import {colors} from '../constants'
import ArrowLeft from '../../assets/arrow-left.svg'
import SearchIcon from '../../assets/search.svg'
import BottomSheet from './BottomSheet'
import TextInput from './TextInput'

type Props = {
  onSelect: (tag: string) => void
  selectedTags: Array<String>
  close: () => void
}

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  txtStyle: {
    color: colors.black_212227,
  },
})

const tags = ['first-task', 'delay-post-restar', 'bad', 'go']
const height = Dimensions.get('window').height / 2

const SelectTag = ({onSelect, selectedTags, close}: Props) => {
  const [searchText, setSearchText] = useState('')

  return (
    <BottomSheet>
      <View
        style={{
          height,
        }}
      >
        <TouchableOpacity onPress={close}>
          <ArrowLeft />
        </TouchableOpacity>
        <TextInput
          accessibilityRole="search"
          accessibilityLabel="search or create tag"
          onChangeText={setSearchText}
          value={searchText}
          Right={() => <SearchIcon />}
          containerStyles={styles.searchContainer}
          style={styles.txtStyle}
          placeholderTextColor={colors.gray_9C9DA2}
          placeholder="Enter to filter or create tag"
          autoFocus={true}
        />
        <FlatList
          data={tags}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <View>
              <Text style={{color: colors.gray_9C9DA2}}>{item}</Text>
            </View>
          )}
        />
      </View>
    </BottomSheet>
  )
}

export default SelectTag
