import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {Mail, Lock, Eye, EyeOff} from 'lucide-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {googleSignIn, setUser} from '../store/authSlice';

type RootStackParamList = {
  Login: undefined; // No parameters for Login
  Home: undefined;
  RoleSelection: undefined;
  Register: undefined;
  MainApp: undefined;
};

// Define the navigation prop type for the LoginScreen
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

// Define the Props interface
interface Props {
  navigation: LoginScreenNavigationProp;
}
import {AppDispatch, RootState} from '../store/index';
import {SpinnerLoader} from './SpinnerLoader';

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    // Handle login logic here
    navigation.navigate('RoleSelection');
  };

  const lsloading = useSelector((state: RootState) => state.auth.lsloading);
  const handleGoogleSignIn = async () => {
    try {
      await dispatch(googleSignIn()).unwrap();
    } catch (error: any) {
      // Alert.alert('Google Sign-In Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top gradient circle */}
      {lsloading ? <SpinnerLoader /> : null}
      <View style={styles.topGradient}>
        {/* <View style={styles.gradientCircle} /> */}
        {/* Light bubbles top */}
        <View style={[styles.lightBubble, styles.topBubbleLarge]} />
        <View style={[styles.lightBubble, styles.topBubbleSmall]} />
      </View>

      {/* Right side bubbles */}
      <View style={styles.rightBubbles}>
        <View style={[styles.sideBubble, styles.rightBubbleLarge]} />
        <View style={[styles.sideBubble, styles.rightBubbleSmall]} />
      </View>

      {/* Bottom gradient circle */}
      <View style={styles.bottomGradient}>
        {/* <View style={styles.gradientCircle} /> */}
        {/* Light bubbles bottom */}
        <View style={[styles.lightBubble, styles.bottomBubbleLarge]} />
        <View style={[styles.lightBubble, styles.bottomBubbleSmall]} />
      </View>

      {/* Left side bubbles */}
      <View style={styles.leftBubbles}>
        <View style={[styles.sideBubble, styles.leftBubbleLarge]} />
        <View style={[styles.sideBubble, styles.leftBubbleSmall]} />
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>

        <View className="mb-5">
          <Text className="text-base font-medium text-purple-900 mb-2">
            Email
          </Text>
          <View className="flex-row items-center bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
            <Mail className="mr-3" color="#4a1c96" size={20} />
            <TextInput
              className="flex-1 text-base text-black"
              placeholder="Enter your email"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password Input */}
        <View className="mb-5">
          <Text className="text-base font-medium text-purple-900 mb-2">
            Password
          </Text>
          <View className="flex-row items-center bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
            <Lock className="mr-3" color="#4a1c96" size={20} />
            <TextInput
              className="flex-1 text-base text-black"
              placeholder="Enter your password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!isPasswordVisible} // Toggle visibility
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="ml-2">
              {isPasswordVisible ? (
                <Eye color="#4a1c96" size={20} />
              ) : (
                <EyeOff color="#4a1c96" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}>
          <View className="flex-row items-center justify-between">
            <Icon name="google" size={21} color="black" />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topGradient: {
    position: 'absolute',
    top: height * 0.01,
    right: -width * 0.4,
    width: width * 0.6,
    height: width * 0.6,
    transform: [{rotate: '120deg'}],
  },
  bottomGradient: {
    position: 'absolute',
    bottom: -height * 0.1,
    left: -width * 0.2,
    width: width * 0.6,
    height: width * 0.6,
    transform: [{rotate: '45deg'}],
  },
  gradientCircle: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.3,
    backgroundColor: '#2c106a',
  },
  lightBubble: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 999,
  },
  topBubbleLarge: {
    width: 64,
    height: 64,
    top: height * 0.2,
    right: -width * 0.006,
    opacity: 0.3,
  },
  topBubbleSmall: {
    width: 32,
    height: 32,
    top: height * 0.19,
    right: width * 0.0005,
    opacity: 0.2,
  },
  bottomBubbleLarge: {
    width: 64,
    height: 64,
    bottom: height * 0.05,
    left: width * 0.05,
    opacity: 0.3,
  },
  bottomBubbleSmall: {
    width: 32,
    height: 32,
    bottom: height * 0.1,
    left: width * 0.15,
    opacity: 0.2,
  },
  rightBubbles: {
    position: 'absolute',
    right: 0,
    top: height * 0.3,
  },
  leftBubbles: {
    position: 'absolute',
    left: 0,
    top: height * 0.6,
  },
  sideBubble: {
    borderRadius: 999,
    backgroundColor: '#4a1c96',
  },
  rightBubbleLarge: {
    width: 48,
    height: 48,
    opacity: 0.2,
  },
  rightBubbleSmall: {
    width: 32,
    height: 32,
    marginTop: 16,
    marginRight: 16,
    opacity: 0.15,
  },
  leftBubbleLarge: {
    width: 48,
    height: 48,
    opacity: 0.2,
  },
  leftBubbleSmall: {
    width: 32,
    height: 32,
    marginTop: 16,
    marginLeft: 16,
    opacity: 0.15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2c106a',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a1c96',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f5ff',
    borderWidth: 1,
    borderColor: '#e5d8ff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#2c106a',
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
  googleButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2c106a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row', // Ensures that the button's content is laid out in a row
    justifyContent: 'center', // Centers the button's content
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#2c106a',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10, // Adds space between the icon and the text
    textAlign: 'center', // Centers the text
    flex: 1,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#4a1c96',
    fontSize: 14,
  },
  registerLink: {
    color: '#2c106a',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginScreen;
