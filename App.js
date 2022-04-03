import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Screens/Navigation';
// import { NativeBaseProvider, Text, Box } from 'native-base';


export default function App() {
  return (
    
    <Navigation> </Navigation>
  );
}

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
