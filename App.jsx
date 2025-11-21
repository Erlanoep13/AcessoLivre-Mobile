import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AdditionRequests } from './src/pages/Admin/AdditionRequests';
import { Footer } from './src/components/Footer';

export default function App() {
  return (
    <View style={styles.container}>
      
      <AdditionRequests />
      <Footer />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e4e28',
  },
});