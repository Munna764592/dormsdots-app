import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, StatusBar} from 'react-native';

export function SpinnerLoader() {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 0.8,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.overlay}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.6)" barStyle="dark-content" />
      <Animated.View
        style={[
          styles.spinner,
          {
            transform: [{scale: scaleValue}],
            opacity: opacityValue,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2c106a', // Matches `.spinner-grow.text-warning`
  },
});
