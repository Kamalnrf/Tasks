import React, {ReactNode} from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {colors} from '../constants'

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.black_000000C0,
  },
  dialogStye: {
    padding: 24,
    backgroundColor: colors.black_2C2D2F,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
})

type Props = {
  children: ReactNode
  testId?: string
}

const BottomSheet = ({children, testId}: Props) => {
  const {bottom} = useSafeAreaInsets()

  const KeyboardView = Platform.OS === 'ios' ? KeyboardAvoidingView : View

  return (
    <Modal testID={testId} transparent animationType="slide">
      <View style={[styles.rootStyle, {paddingBottom: bottom}]}>
        <KeyboardView behavior="padding" style={styles.dialogStye}>
          {children}
        </KeyboardView>
      </View>
    </Modal>
  )
}

export default BottomSheet
