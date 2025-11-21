import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AdditionRequests } from './src/pages/Admin/AdditionRequests';
import { Footer } from './src/components/Footer';
import { Navbar } from './src/components/Navbar';


export default function App() {
  return (
    <View style={styles.container}>
      
      <Navbar />
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