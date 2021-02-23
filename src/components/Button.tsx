import React from 'react'
import {
  AccessibilityProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Text,
  TextStyle,
} from 'react-native'
import {colors} from '../constants'

type Props = AccessibilityProps & {
  children: string
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const styles = StyleSheet.create({
  txt: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 46,
    fontSize: 15,
    color: colors.blue_92A9EC,
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
})

const Button = ({
  containerStyle,
  children,
  onPress,
  textStyle,
  ...props
}: Props) => (
  <TouchableOpacity
    style={containerStyle}
    onPress={onPress}
    accessibilityRole="button"
    {...props}
  >
    <Text style={[styles.txt, textStyle]}>{children}</Text>
  </TouchableOpacity>
)

export default Button
