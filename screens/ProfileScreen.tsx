import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';
import {Text} from 'react-native-elements';
import {
  CircleUserRound,
  Bookmark,
  History,
  Settings,
  LogOut,
} from 'lucide-react-native';
import {ThemeProvider, useTheme} from '../contexts/ThemeContext';
const {width} = Dimensions.get('window');

import {AppDispatch, RootState} from '../store/index';
import {rightSidebar} from '../store/profileRedux';
import {useDispatch, useSelector} from 'react-redux';
import {googleSignOut} from '../store/authSlice';

export default function ProfileScreen() {
  const {theme} = useTheme();
  const rightSlideAnim = useRef(new Animated.Value(-width)).current;
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const slideAnim = useRef(new Animated.Value(-width)).current;

  const profileSidebar = useSelector(
    (state: RootState) => state.profile.profileSidebar,
  );

  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    if (profileSidebar) {
      Animated.timing(rightSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [profileSidebar]);

  const closeRightSidebar = () => {
    Animated.timing(rightSlideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => dispatch(rightSidebar(!profileSidebar)));
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -width / 4) {
        // closeSidebar();
      }
      if (gestureState.dx > width / 4) {
        closeRightSidebar();
      }
    },
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        right: rightSlideAnim,
        width: width * 0.8,
        height: '100%',
        backgroundColor: theme.background,
        padding: 20,
        zIndex: 50,
        shadowColor: '#000',
        shadowOffset: {width: -5, height: 0},
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
      }}
      {...panResponder.panHandlers}>
      <TouchableWithoutFeedback>
        <View className="mt-14 relative h-full">
          {/* Profile Section */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}
            onPress={() => console.log('Profile Clicked')}>
            <CircleUserRound
              size={20}
              color={theme.text}
              style={{marginRight: 10}}
            />
            <Text
              style={{
                color: theme.text,
                fontSize: 18,
                fontFamily: 'Poppins-Light',
                marginTop: 3,
              }}>
              Profile
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: '#3C3C3C',
              width: '100%',
              marginBottom: 10,
            }}
          />
          {/* Saved */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
            onPress={() => console.log('Saved Clicked')}>
            <Bookmark size={20} color={theme.text} style={{marginRight: 10}} />
            <Text
              style={{
                color: theme.text,
                fontSize: 18,
                fontFamily: 'Poppins-Light',
              }}>
              Saved
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: '#3C3C3C',
              width: '100%',
              marginBottom: 10,
            }}
          />

          {/* History */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
            onPress={() => console.log('History Clicked')}>
            <History size={20} color={theme.text} style={{marginRight: 10}} />
            <Text
              style={{
                color: theme.text,
                fontSize: 18,
                fontFamily: 'Poppins-Light',
              }}>
              History
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: 1,
              backgroundColor: '#3C3C3C',
              width: '100%',
              marginBottom: 10,
            }}
          />
          <View className="absolute bottom-[42px] w-full">
            <View
              style={{
                height: 1,
                backgroundColor: '#3C3C3C',
                width: '100%',
                marginVertical: 10,
              }}
            />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                console.log('Create Circle pressed!');
              }}>
              <Settings size={20} color={theme.text} style={{marginRight: 8}} />
              <Text
                style={{
                  color: theme.text,
                  fontSize: 18,
                  fontFamily: 'Poppins-Light',
                  marginTop: 4,
                }}>
                Settings
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                backgroundColor: '#3C3C3C',
                width: '100%',
                marginVertical: 10,
              }}
            />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}
              onPress={() => dispatch(googleSignOut())}>
              <LogOut size={20} color={theme.text} style={{marginRight: 10}} />
              <Text
                style={{
                  color: theme.text,
                  fontSize: 18,
                  fontFamily: 'Poppins-Light',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  bio: {
    textAlign: 'center',
    marginVertical: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
});
