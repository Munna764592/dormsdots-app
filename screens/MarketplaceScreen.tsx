import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MarketplaceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Marketplace Screen</Text>
    </View>
  );
};

export default MarketplaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
