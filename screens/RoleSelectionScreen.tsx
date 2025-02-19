import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  CheckSquare,
  Mail,
  Square,
  User,
  UserRound,
  UserRoundSearch,
} from 'lucide-react-native';

const {width, height} = Dimensions.get('window');

const RoleSelectionScreen = () => {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null); // "schoolers" or "collegians"
  const [username, setUsername] = useState<string>('');

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role === selectedRole ? null : role);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.bubble, styles.bubble1]} />
      <View style={[styles.bubble, styles.bubble2]} />
      <View style={[styles.bubble, styles.bubble3]} />
      <View style={[styles.bubble, styles.bubble4]} />
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.textSemiBold}>Who are you?</Text>
        </View>

        {/* Role Selection with Checkboxes */}
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleRoleSelection('schoolers')}>
            {selectedRole === 'schoolers' ? (
              <CheckSquare color="#6B4EFF" size={24} />
            ) : (
              <Square color="#6B4EFF" size={24} />
            )}
            <Text style={styles.checkboxLabel}>Schoolers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleRoleSelection('collegians')}>
            {selectedRole === 'collegians' ? (
              <CheckSquare color="#6B4EFF" size={24} />
            ) : (
              <Square color="#6B4EFF" size={24} />
            )}
            <Text style={styles.checkboxLabel}>Collegians</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-5">
          <View className="flex-row items-center bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
            <UserRound className="mr-3" color="#4a1c96" size={20} />
            <TextInput
              className="flex-1 text-base text-black"
              placeholder="Enter your username"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.getStartedText}>Let's Go →</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Customized according to your need</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 36,
    color: '#2c106a',
    textAlign: 'left',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 20,
  },
  roleContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 18,
    marginLeft: 10,
    color: '#2c106a',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4a1c96',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3ff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d8b4fe',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  getStartedButton: {
    marginTop: 30,
    backgroundColor: '#2c106a',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#9ca3af',
    fontWeight: 'bold',
  },
  bubble: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(107, 78, 255, 0.1)',
  },
  bubble1: {
    width: 200,
    height: 200,
    top: -0,
    right: -120,
  },
  bubble2: {
    width: 150,
    height: 150,
    top: height * 0.3,
    left: -75,
  },
  bubble3: {
    width: 100,
    height: 100,
    bottom: height * 0.2,
    right: -20,
  },
  bubble4: {
    width: 120,
    height: 120,
    bottom: -60,
    left: 40,
  },
  cardBubble: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    right: -20,
    top: -20,
  },
});

export default RoleSelectionScreen;
