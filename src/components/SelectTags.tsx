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
import {Tag} from '../types'
import Tick from '../../assets/tick.svg'
import {useTags} from '../hooks/useTags'
import BottomSheet from './BottomSheet'
import TextInput from './TextInput'

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
  itemContainer: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTxt: {
    color: colors.gray_9C9DA2,
    fontSize: 18,
    fontFamily: 'Roboto_400Regular',
  },
})

const height = Dimensions.get('window').height / 2

type Props = {
  selectedTags: Array<Tag>
  onClose: (selectedTags: Array<Tag>) => void
}

const SelectTags = (props: Props) => {
  const [selectedTags, setSelectedTags] = useState(props.selectedTags)
  const [searchText, setSearchText] = useState('')
  const {data} = useTags()

  return (
    <BottomSheet>
      <View style={{height}}>
        <TouchableOpacity onPress={() => props.onClose(selectedTags)}>
          <ArrowLeft />
        </TouchableOpacity>
        <TextInput
          accessibilityRole="search"
          accessibilityLabel="search for tag"
          onChangeText={setSearchText}
          value={searchText}
          Right={() => <SearchIcon />}
          containerStyles={styles.searchContainer}
          style={styles.txtStyle}
          placeholderTextColor={colors.gray_9C9DA2}
          placeholder="Enter to filter tag"
        />
        <FlatList
          data={
            searchText.length > 0
              ? data?.tags.filter((tag) => tag.name.includes(searchText))
              : data?.tags
          }
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            const isSelected = selectedTags.includes(item)
            return (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  if (isSelected)
                    setSelectedTags(
                      selectedTags.filter((tag) => tag.id !== item.id),
                    )
                  else setSelectedTags([...selectedTags, item])
                }}
              >
                <Text style={styles.itemTxt}>{item.name}</Text>
                {isSelected ? <Tick /> : <></>}
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </BottomSheet>
  )
}

export default SelectTags
