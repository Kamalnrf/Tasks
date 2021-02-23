import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Cross from '../../assets/cross.svg'
import {colors} from '../constants'

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderColor: colors.black_9C9DA2,
    borderWidth: 1.5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    margin: 3,
  },
  content: {
    color: colors.black_9C9DA2,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
})

type Props = {
  name: string
}

const Tag = ({name}: Props) => (
  <View
    style={styles.container}
    accessibilityLabel={`tag ${name}, tap to delete`}
    accessibilityRole="button"
  >
    <Text style={styles.content}>{name}</Text>
    <Cross height={10} width={10} />
  </View>
)

export default Tag
