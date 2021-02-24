import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import Animated, {
  call,
  Easing,
  multiply,
  set,
  sub,
  useCode,
  Value,
} from 'react-native-reanimated'
import {loop} from 'react-native-redash'
import Svg, {
  Circle,
  ClipPath,
  Defs,
  LinearGradient,
  Stop,
  Text,
  Line,
} from 'react-native-svg'
import {colors} from '../constants'

type Props = {
  startTime: string | null
  isTaskRunning: boolean
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const styles = StyleSheet.create({
  svg: {
    transform: [{rotateZ: '270deg'}],
  },
})

const SIZE = 100
const r = (SIZE - 10) / 2
const circumference = r * 2 * Math.PI
const cx = SIZE / 2
const cy = SIZE / 2

const getDiffMins = (time: string) => {
  const startDate = new Date(time)
  const currentDate = new Date()
  const diffMs = Math.abs(startDate.getTime() - currentDate.getTime())
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)

  return diffMins
}

const TimeProgress = ({startTime, isTaskRunning}: Props) => {
  const progress = new Value(0)
  const α = multiply(sub(1, progress), Math.PI * 2)
  const strokeDashoffset = multiply(α, r)
  const [timer, setTimer] = useState<number>(0)

  useCode(() => {
    if (isTaskRunning) {
      return [
        set(
          progress,
          loop({easing: Easing.bezier(0.87, 0, 0.13, 1), duration: 60000}),
        ),
        call([], () => {
          setTimer(getDiffMins(startTime as string))
        }),
      ]
    }
  }, [progress, startTime])

  return (
    <Svg
      style={styles.svg}
      width={SIZE}
      height={SIZE}
      accessibilityRole="progressbar"
    >
      <Defs>
        <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="100%" stopColor="#00A699" stopOpacity="1" />
          <Stop
            offset="0%"
            stopColor="rgba(0, 96, 166, 0.97)"
            stopOpacity="1"
          />
        </LinearGradient>
        <ClipPath id="clip">
          <Circle cx="50%" cy="50%" r={r - 4} />
        </ClipPath>
      </Defs>
      <Circle
        stroke={colors.gray_9C9DA2}
        strokeWidth="10"
        {...{
          cx,
          cy,
          r,
        }}
      />
      <AnimatedCircle
        stroke="url(#grad1)"
        strokeWidth="10"
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeLinecap="round"
        {...{
          strokeDashoffset,
          cx,
          cy,
          r,
        }}
      />
      {isTaskRunning ? (
        <Text
          fill={colors.gray_9C9DA2}
          fontSize="30"
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          transform={{
            rotation: '90',
            originX: 50,
            originY: 50,
          }}
        >
          {`${timer === 0 ? '0' : timer}m`}
        </Text>
      ) : (
        <Line
          x={cx}
          y1={25}
          y2={75}
          stroke={colors.gray_9C9DA2}
          strokeWidth="7"
        />
      )}
    </Svg>
  )
}

export default TimeProgress
