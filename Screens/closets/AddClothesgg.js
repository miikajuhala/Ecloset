import React , { useState, useEffect } from 'react';
import {View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import { Camera } from 'expo-camera';





export default function AddClothesgg({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);


 
  
  


  // functio mikä lisää otetun kuvan kantaa auth.id/pics/uuspicID

  

 
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>add clothes screen</Text>


        <Button style={styles.btn} onPress={()=>navigation.navigate("Camera")}  title='Take picture'></Button>

        <Button style={styles.btn} onPress={()=>folder()} title='Select from phone'></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center"
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  btn: {
    fontSize: 32,
  },
});