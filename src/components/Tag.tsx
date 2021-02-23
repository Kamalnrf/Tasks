import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native'
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
    margin: 3,
    padding: 5,
  },
  content: {
    color: colors.black_9C9DA2,
    paddingHorizontal: 5,
  },
  button: {
    paddingRight: 5,
  },
})

type Props = {
  name: string
  onDelete?: (event: GestureResponderEvent) => void
}

const Tag = ({name, onDelete}: Props) => (
  <View style={styles.container} accessibilityLabel={`tag ${name}`}>
    <Text style={styles.content}>{name}</Text>
    {onDelete ? (
      <TouchableOpacity
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel="remove"
        style={styles.button}
      >
        <Cross height={10} width={10} />
      </TouchableOpacity>
    ) : (
      <></>
    )}
  </View>
)

export default Tag
