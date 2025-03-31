import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/index'; // Adjust according to your store path
import {hideToast} from '../store/toastSlice';

const Toastify = () => {
  const dispatch = useDispatch();
  const {message, visible} = useSelector((state: RootState) => state.toast);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => dispatch(hideToast()));
      }, 3000);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, {opacity: fadeAnim}]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 50,
    left: '10%',
    width: '80%',
    backgroundColor: 'rgba(30, 30, 30, 1)', // Semi-transparent
    padding: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10}, // Deeper shadow
    shadowOpacity: 0.9, // Stronger shadow
    shadowRadius: 10, // Wider spread
    elevation: 10, // Premium depth
    borderWidth: 1, // Thin subtle border
    borderColor: 'rgba(255, 255, 255, 0.1)', // Soft glow effect
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Toastify;
