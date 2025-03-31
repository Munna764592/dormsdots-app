import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Toast} from 'toastify-react-native';

const Another: React.FC = () => {
  const showToast = () => {
    Toast.info('Lorem ipsum info', 'bottom'); // Correct way to set position
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showToast} style={styles.buttonStyle}>
        <Text>SHOW SOME AWESOMENESS!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: 'white',
    borderColor: 'green',
    borderWidth: 2,
    padding: 10,
  },
});

export default Another;
