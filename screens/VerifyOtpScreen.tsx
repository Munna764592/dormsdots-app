import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Keyboard,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Timer,
  ArrowLeft,
  CircleCheck as CheckCircle2,
} from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../store/index';
import {matchOtp} from '../store/authSlice';

const OTP_LENGTH = 5;
const RESEND_COOLDOWN = 30;

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);
  const shake = useSharedValue(0);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  // Animation for error shake
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: shake.value}],
  }));

  useEffect(() => {
    if (error) {
      shake.value = withSequence(
        withTiming(10, {duration: 100}),
        withTiming(-10, {duration: 100}),
        withTiming(10, {duration: 100}),
        withTiming(0, {duration: 100}),
      );
    }
  }, [error]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    try {
      setError('');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(RESEND_COOLDOWN);
      // Show success message
      setError('New OTP sent successfully!');
      setTimeout(() => setError(''), 3000);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const verifyOtp = async () => {
    Keyboard.dismiss();
    const otpString = otp.join('');

    if (otpString.length !== OTP_LENGTH) {
      setError('Please enter all digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await dispatch(matchOtp({otp: otpString}));

      if (response.meta.requestStatus === 'fulfilled') {
        setVerificationSuccess(true);
      } else {
        throw new Error(response.payload || 'Invalid OTP');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  if (verificationSuccess) {
    return (
      <View style={styles.successContainer}>
        <CheckCircle2 size={64} color="#4CAF50" />
        <Text style={styles.successText}>Verification Successful!</Text>
        <Text style={styles.redirectingText}>Redirecting...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View className="flex items-center justify-center my-10">
            <TouchableOpacity
              className="bg-gray-200 border border-gray-800 rounded-lg p-2 w-12 h-12 flex items-center justify-center"
              onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} strokeWidth={1} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Verify Your Account</Text>
          <Text style={styles.subtitle}>
            Enter the 5-digit code sent to your email
          </Text>

          <Animated.View style={[styles.otpContainer, animatedStyle]}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  digit && styles.otpInputFilled,
                  error && styles.otpInputError,
                ]}
                value={digit}
                onChangeText={text => handleOtpChange(text.slice(-1), index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                testID={`otp-input-${index}`}
              />
            ))}
          </Animated.View>

          {error ? (
            <Text
              style={[
                styles.errorText,
                error.includes('sent successfully') && styles.successMessage,
              ]}>
              {error}
            </Text>
          ) : (
            <Text style={styles.spacer}> </Text>
          )}

          <TouchableOpacity
            style={[
              styles.verifyButton,
              (isVerifying || otp.includes('')) && styles.verifyButtonDisabled,
            ]}
            onPress={verifyOtp}
            disabled={isVerifying || otp.includes('')}>
            {isVerifying ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.verifyButtonText}>Verify</Text>
            )}
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Timer size={16} color="#666" style={styles.timerIcon} />
            {countdown > 0 ? (
              <Text style={styles.countdownText}>
                Resend code in {countdown}s
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>
          <View className="relative bottom-0 w-full items-center my-14 px-4">
            <Text className="text-center text-gray-600">
              If you continue, you are accepting dormsdots{' '}
              <Text
                className="text-blue-600 underline"
                onPress={() => Linking.openURL('https://dormsdots.com/tc')}>
                Terms & Conditions
              </Text>{' '}
              and{' '}
              <Text
                className="text-blue-600 underline"
                onPress={() => Linking.openURL('https://dormsdots.com/pp')}>
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    position: 'relative',
  },
  backButton: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white', // Gray background
    borderRadius: 10, // Rounded corners
    borderWidth: 1, // Border thickness
    borderColor: 'gray', // Black border
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    width: 50, // Set width for a circular look
    height: 50, // Set height for a circular look
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: '#f5f5f5',
  },
  otpInputFilled: {
    backgroundColor: '#fff',
    borderColor: '#007AFF',
  },
  otpInputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
  },
  successMessage: {
    color: '#4CAF50',
  },
  spacer: {
    height: 20,
  },
  verifyButton: {
    backgroundColor: '#2c106a',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 70,
  },
  verifyButtonDisabled: {
    backgroundColor: '#4a2c8c',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerIcon: {
    marginRight: 8,
  },
  countdownText: {
    color: '#666',
    fontSize: 16,
  },
  resendText: {
    color: '#2c106a',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 20,
  },
  redirectingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});
