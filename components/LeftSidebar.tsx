import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated, Easing} from 'react-native';
import {AlignLeft} from 'lucide-react-native';

const LeftSidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current;

  const toggleSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: isSidebarVisible ? -250 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <View className="absolute top-12 left-3">
      {/* AlignLeft Button */}
      <TouchableOpacity onPress={toggleSidebar} className="p-2">
        <AlignLeft size={30} color="black" />
      </TouchableOpacity>

      {/* Sidebar */}
      <Animated.View
        style={{left: slideAnim}}
        className="absolute top-0 w-64 h-full bg-white shadow-lg p-5">
        <Text className="text-lg font-semibold mb-4">Some Text</Text>
        <Text className="text-lg font-semibold">All</Text>
      </Animated.View>
    </View>
  );
};

export default LeftSidebar;
