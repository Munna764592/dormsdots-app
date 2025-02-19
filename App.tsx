import React, {useRef, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {RootState, store} from './store/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './screens/CommunityScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import NewsScreen from './screens/NewsScreen';
import CreateScreen from './screens/CreateScreen';
import NotificationScreen from './screens/NotificationScreen';
import ChatScreen from './screens/ChatScreen';
import MessageScreen from './screens/MessageScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import StartPage from './screens/StartPage';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import {ThemeProvider, useTheme} from './contexts/ThemeContext';
import {
  Bell,
  Home,
  MessageCircle,
  MessageCircleMore,
  MessageSquare,
  Plus,
  Search,
  AlignLeft,
  Sun,
  Moon,
  CircleUserRound,
  ChevronDown,
  ChevronUp,
  Briefcase,
  ShoppingCart,
  MessageSquareHeart,
  ShoppingBag,
  Circle,
  CirclePlus,
  Bookmark,
  History,
  Settings,
  CircleDotDashed,
} from 'lucide-react-native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  TouchableHighlight,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';
import FreelanceScreen from './screens/FreelanceScreen';
import MarketplaceScreen from './screens/MarketplaceScreen';
import {PostDetailScreen} from './screens/PostDetailScreen';
const {height, width} = Dimensions.get('window');

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import {AppDispatch} from './store/index';
import {rightSidebar} from './store/profileRedux';

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Start" component={StartPage} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownAnim] = useState(new Animated.Value(0));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateAnim] = useState(new Animated.ValueXY({x: 100, y: 0}));
  const navigation = useNavigation();
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const profileSidebar = useSelector(
    (state: RootState) => state.profile.profileSidebar,
  );

  const toggleDropdown = () => {
    if (isDropdownVisible) {
      // Hide dropdown with corner collapse animation (scale down + fade out + translate)
      Animated.parallel([
        Animated.timing(dropdownAnim, {
          toValue: 0, // Scale down to 0 (collapsed)
          duration: 200,
          easing: Easing.out(Easing.ease), // Smooth ease out for collapsing
          useNativeDriver: true, // Use native driver for performance
        }),
        Animated.timing(fadeAnim, {
          toValue: 0, // Fade out (opacity 0)
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true, // Native driver for performance
        }),
        Animated.timing(translateAnim, {
          toValue: {x: 0, y: 0}, // Reset translation back to original position
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0, // Rotate back to 0
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true, // Native driver for performance
        }),
      ]).start(() => setDropdownVisible(false)); // Set dropdown as hidden after animation
    } else {
      setDropdownVisible(true);

      Animated.parallel([
        Animated.timing(dropdownAnim, {
          toValue: 1, // Scale to 1 (fully expanded)
          duration: 200,
          easing: Easing.out(Easing.elastic(1)), // Elastic easing for bounce
          useNativeDriver: true, // Native driver for performance
        }),

        Animated.timing(fadeAnim, {
          toValue: 1, // Fully visible (opacity 1)
          duration: 200,
          easing: Easing.out(Easing.ease), // Smooth ease in for fading
          useNativeDriver: true, // Native driver for performance
        }),

        Animated.timing(translateAnim, {
          toValue: {x: 0, y: 40},
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 180, // Rotate 180 degrees
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true, // Native driver for performance
        }),
      ]).start();
    }
  };

  const dropdownStyle = {
    opacity: fadeAnim,
    transform: [
      {scale: dropdownAnim}, // For scaling the dropdown (expand/contract)
      {translateX: translateAnim.x}, // For translation in the X direction
      {translateY: translateAnim.y}, // For translation in the Y direction (corner effect)
    ],
  };

  const rotateStyle = {
    transform: [
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const navigateToScreen = (screen: string) => {
    navigation.navigate(screen as never);
    toggleDropdown();
  };

  const slideAnim = useRef(new Animated.Value(-width)).current;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    closeRightSidebar();
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsSidebarOpen(false));
  };

  const rightSlideAnim = useRef(new Animated.Value(-width)).current;
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const openRightSidebar = () => {
    dispatch(rightSidebar(!profileSidebar));
  };

  const closeRightSidebar = () => {
    Animated.timing(rightSlideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsRightSidebarOpen(false));
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -width / 4) {
        closeSidebar();
      }
      if (gestureState.dx > width / 4) {
        closeRightSidebar();
      }
    },
  });

  return (
    <TouchableWithoutFeedback
      onPress={event => {
        if (isSidebarOpen && event.nativeEvent.pageX > width * 0.8) {
          closeSidebar();
        }
        if (isRightSidebarOpen && event.nativeEvent.pageX < width * 0.2) {
          closeRightSidebar();
        }
      }}>
      <View style={{flex: 1, position: 'relative'}}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: slideAnim,
            width: width * 0.8,
            height: '100%',
            backgroundColor: theme.background,
            padding: 20,
            zIndex: 50,
            // iOS Shadow
            shadowColor: '#000',
            shadowOffset: {width: -5, height: 0},
            shadowOpacity: 0.4,
            shadowRadius: 10,
            // Android Shadow
            elevation: 10,
          }}
          {...panResponder.panHandlers}>
          <TouchableWithoutFeedback>
            <View className="mt-14 relative h-full">
              <Text
                style={{
                  color: theme.text,
                  fontSize: 18,
                  flexDirection: 'row',
                  alignItems: 'center',
                  fontFamily: 'Poppins-Light',
                }}>
                <Circle size={12} color={theme.text} style={{marginRight: 8}} />{' '}
                Your Circle
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: '#3C3C3C',
                  width: '100%',
                  marginVertical: 5,
                }}
              />
              <Text style={{color: theme.text, marginVertical: 10}}>
                hello46454646/dots
              </Text>
              <Text className="mb-1" style={{color: theme.text}}>
                JEE/dots
              </Text>
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
                  // Your onPress functionality here
                  console.log('Create Circle pressed!');
                }}>
                <CirclePlus
                  size={20}
                  color={theme.text}
                  style={{marginRight: 8}}
                />
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 18,
                    fontFamily: 'Poppins-Light',
                    marginTop: 4,
                  }}>
                  Create Circle
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
              <Text style={{color: theme.text, marginVertical: 10}}>
                BollyBlindsNGossip/dots
              </Text>
              <Text style={{color: theme.text}}>CATpreparation/dots</Text>
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
                    // Your onPress functionality here
                    console.log('Create Circle pressed!');
                  }}>
                  <CircleDotDashed
                    size={20}
                    color={theme.text}
                    style={{marginRight: 8}}
                  />
                  <Text
                    style={{
                      color: theme.text,
                      fontSize: 18,
                      fontFamily: 'Poppins-Light',
                      marginTop: 4,
                    }}>
                    Explore Circle
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarShowLabel: false,
            tabBarStyle: {
              paddingTop: 8,
              paddingBottom: 10,
              height: 55,
              backgroundColor: theme.background,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomColor: theme.tabbg,
            },
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'dormsdots') {
                return focused ? (
                  <View
                    style={{
                      backgroundColor: theme.tabbg,
                      borderRadius: 50,
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Home size={25} color="#4F4F4F" />
                  </View>
                ) : (
                  <Home size={25} color="gray" />
                );
              } else if (route.name === 'SrchCircle') {
                return focused ? (
                  <View
                    style={{
                      backgroundColor: theme.tabbg,
                      borderRadius: 50,
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Search size={25} color="#4F4F4F" />
                  </View>
                ) : (
                  <Search size={25} color="gray" />
                );
              } else if (route.name === 'Create') {
                return (
                  <View
                    style={styles.shadowBox}
                    className={`p-1 px-3 ${
                      isDarkMode ? 'bg-[#1e1e1e]' : 'bg-gray-200'
                    }  rounded-2xl`}>
                    {focused ? (
                      <Plus size={25} color="#4a1c96" fill="#4a1c96" />
                    ) : (
                      <Plus size={25} color="#4a1c96" />
                    )}
                    3
                  </View>
                );
              } else if (route.name === 'Notification') {
                return focused ? (
                  <View
                    style={{
                      backgroundColor: theme.tabbg,
                      borderRadius: 50,
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Bell size={25} color="#4F4F4F" />
                  </View>
                ) : (
                  <Bell size={25} color="gray" />
                );
              } else if (route.name === 'Message') {
                return focused ? (
                  <View
                    style={{
                      backgroundColor: theme.tabbg,
                      borderRadius: 50,
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MessageCircleMore size={25} color="#4F4F4F" />
                  </View>
                ) : (
                  <MessageCircleMore size={25} color="gray" />
                );
              }
            },
          })}>
          <Tab.Screen
            name="dormsdots"
            component={HomeScreen}
            options={{
              headerTitle: () => (
                <TouchableOpacity
                  onPress={toggleDropdown}
                  style={styles.dropdownButton}>
                  <Text style={styles.headerTitle}>dormsdots</Text>
                  <Animated.View style={rotateStyle}>
                    <ChevronDown
                      size={18}
                      color={isDarkMode ? 'gray' : 'black'}
                      strokeWidth={2}
                    />
                  </Animated.View>
                </TouchableOpacity>
              ),
              headerTitleStyle: {
                fontSize: 25,
                fontFamily: 'Poppins-SemiBold',
                color: '#4a1c96',
                textAlign: 'center',
              },
              headerStyle: {
                backgroundColor: theme.background,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: theme.tabbg,
              },
              headerLeft: () => (
                <TouchableOpacity onPress={openSidebar}>
                  <AlignLeft
                    size={25}
                    color={isDarkMode ? 'gray' : 'black'}
                    style={{marginLeft: 15}}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 15}}>
                  <TouchableOpacity onPress={toggleTheme}>
                    {isDarkMode ? (
                      <Sun size={25} color="gray" style={{marginRight: 15}} />
                    ) : (
                      <Moon size={25} color="black" style={{marginRight: 15}} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openRightSidebar()}>
                    <CircleUserRound
                      size={25}
                      color={isDarkMode ? 'gray' : 'black'}
                    />
                  </TouchableOpacity>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="SrchCircle"
            options={{headerShown: false}}
            component={SearchScreen}
          />
          <Tab.Screen
            options={{headerShown: false}}
            name="Create"
            component={CreateScreen}
          />
          <Tab.Screen
            options={{headerShown: false}}
            name="Notification"
            component={NotificationScreen}
          />
          <Tab.Screen
            options={{headerShown: false}}
            name="Message"
            component={MessageScreen}
          />
        </Tab.Navigator>

        {isDropdownVisible && (
          <Animated.View
            style={[
              styles.dropdown,
              dropdownStyle,
              {backgroundColor: theme.dropdown},
            ]}>
            {[
              {name: 'HomeTabs', label: 'Home', icon: MessageSquareHeart},
              // {name: 'Freelance', label: 'Freelance', icon: Briefcase},
              {name: 'Marketplace', label: 'Marketplace', icon: ShoppingBag},
            ].map(item => {
              const IconComponent = item.icon;
              return (
                <TouchableHighlight
                  key={item.name}
                  onPress={() => {
                    navigateToScreen(item.name);
                  }}
                  underlayColor={isDarkMode ? '#787878' : '#E0E0E0'}
                  style={styles.dropdownItem}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 0,
                    }}>
                    <IconComponent
                      size={20}
                      color={isDarkMode ? 'white' : 'black'}
                    />
                    <Text
                      style={[
                        styles.dropdownText,
                        {
                          fontFamily: 'Poppins-SemiBold',
                          marginLeft: 8,
                          color: isDarkMode ? 'white' : 'black',
                        },
                      ]}>
                      {item.label}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </Animated.View>
        )}
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
                <Bookmark
                  size={20}
                  color={theme.text}
                  style={{marginRight: 10}}
                />
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
                <History
                  size={20}
                  color={theme.text}
                  style={{marginRight: 10}}
                />
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
                    // Your onPress functionality here
                    console.log('Create Circle pressed!');
                  }}>
                  <Settings
                    size={20}
                    color={theme.text}
                    style={{marginRight: 8}}
                  />
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
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 30,
                  width: '100%',
                }}></View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function MainStack() {
    const profileSidebar = useSelector(
      (state: RootState) => state.profile.profileSidebar,
    );

  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      </Stack.Navigator>
      {profileSidebar && <ProfileScreen />}
    </>
  );
}

function AppNavigator() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Screen name="MainApp" component={MainStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  animatedViewStyle: {
    position: 'absolute',
    top: 40,
    width: 256,
    height: height,
    backgroundColor: 'black',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    padding: 20,
    zIndex: 50,
  },
  shadowBox: {
    borderRadius: 8,
    shadowColor: 'rgba(60, 64, 67, 1)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 0,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 25,
    fontFamily: 'Poppins-SemiBold',
    color: '#4a1c96',
    marginRight: 4,
  },
  dropdown: {
    position: 'absolute',
    top: 55,
    left: 45,
    fontFamily: 'Poppins-SemiBold',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 180,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 50,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
