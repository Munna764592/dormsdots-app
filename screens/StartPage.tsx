import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar
} from 'react-native';
import Slider from '../components/Slider';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {ArrowRight} from 'lucide-react-native';

type RootStackParamList = {
  Login: undefined; // Define your route names here
};

export default function StartPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        backgroundColor="white" // Your theme color
        barStyle="dark-content" // Light text for dark background
      />
      <View className="flex-1 px-6 pt-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text
            style={styles.textSemiBold}
            className="text-gray-500 text-xl font-semibold">
            Welcome to <Text className="text-[#2c106a]">dormsdots</Text>
          </Text>
        </View>

        {/* Main Heading */}
        <Text
          style={styles.textSemiBold}
          className="text-4xl mb-8 text-gray-900">
          Bringing you closer{'\n'}to your needs
        </Text>

        {/* Preview Card */}
        <View className="mb-8">
          <Slider />
        </View>

        {/* Action Buttons */}
        <View className="space-y-4 mt-auto mb-8">
          <TouchableOpacity
            style={styles.signInButton}
            className="bg-purple-200 py-5 rounded-xl flex-row justify-center items-center"
            onPress={() => handleNavigate('Login')}>
            <Text style={styles.signInButtonText}>Next →</Text>
            {/* <ArrowRight color="#fff" size={18} style={styles.icon} /> */}
          </TouchableOpacity>

          <View className="mr-2">
            <Text
              style={styles.textRegular}
              className="text-gray-400 font-bold text-center my-4 text-base">
              Interact ~ Marketplace
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textSemiBold: {
    fontFamily: 'Poppins-SemiBold',
  },
  textRegular: {
    fontFamily: 'Poppins-Regular',
  },
  signInButton: {
    backgroundColor: '#2c106a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  icon:{
    marginLeft:10,
  }
});
