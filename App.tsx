import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Footer } from './src/components/Footer';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Acesso livre!</Text>
      </View>

      <Footer />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
});
