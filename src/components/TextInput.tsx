import React, {forwardRef} from 'react'
import {
  TextInput as RNTextInput,
  TextInputProps,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Platform,
  GestureResponderEvent,
} from 'react-native'
import {colors} from '../constants'

interface FormTextInputProps extends TextInputProps {
  Right?: React.ReactNode
  disabled?: boolean
  containerStyles?: StyleProp<ViewStyle>
  testID?: string
  accessibilityLabel: string
  onPress?: (event: GestureResponderEvent) => void
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    paddingLeft: 2,
    flex: 1,
    padding: 0,
    marginTop: Platform.OS === 'android' ? 5 : 0,
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    lineHeight: 25,
    color: colors.white,
  },
})

// eslint-disable-next-line react/display-name
const TextInput = forwardRef<RNTextInput, FormTextInputProps>(
  ({Right, containerStyles, disabled, ...props}, ref) => {
    return (
      <View style={[styles.wrapper, containerStyles]}>
        <RNTextInput
          placeholderTextColor={colors.gray_9C9DA2}
          underlineColorAndroid="transparent"
          editable={!disabled}
          allowFontScaling={true}
          ref={ref}
          {...props}
          style={[styles.textInput, props.style]}
          showSoftInputOnFocus={!props.onPress}
        />
        {Right ? <Right /> : <></>}
      </View>
    )
  },
)

export default TextInput
