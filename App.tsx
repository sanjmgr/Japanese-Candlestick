import React from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  add,
  diffClamp,
  eq,
  modulo,
  sub,
} from 'react-native-reanimated';
import { onGestureEvent, useValues } from 'react-native-redash';

import data from './data.json';
import Chart from './Components/Chart';
import Values from './Components/Values';
import Line from './Components/Line';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    color: '#fff',
  },
});

const candles = data.slice(0, 25);
const { width: size } = Dimensions.get('window');
const caliber = size / candles.length;
const values = candles.map(candle => [candle.low, candle.high]).flat();
const domain = [Math.min(...values), Math.max(...values)];

export default function App() {
  const [x, y, state] = useValues([0, 0, State.UNDETERMINED]);
  const gestureHandler = onGestureEvent({ x, y, state });
  const opacity = eq(state, State.ACTIVE);
  const translateY = diffClamp(y, 0, size);
  const subX = sub(x, modulo(x, caliber));
  const translateX: Animated.Node<number> = add(subX, caliber);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'}></StatusBar>
      <Values {...{ candles, caliber }} />
      <Chart {...{ candles, caliber, size, domain }} />
      <PanGestureHandler minDist={0} {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={{
              transform: [{ translateY }],
              opacity,
              ...StyleSheet.absoluteFillObject,
            }}
          >
            <Line x={size} y={0} />
          </Animated.View>
          <Animated.View
            style={{
              // transform: [{ translateX }],
              opacity,
              ...StyleSheet.absoluteFillObject,
            }}
          >
            <Line x={0} y={size} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
