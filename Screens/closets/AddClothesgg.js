import React , { useState, useEffect } from 'react';
import {View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import ImagePickerScreen from './ImagePicker'
import { AntDesign,  Ionicons} from '@expo/vector-icons';



export default function AddClothesgg({navigation}) {
 


 
 
  return (
    <View style={styles.container}> 
        {/* <Text style={styles.title}>add new clothes</Text> */}


        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Camera")}>
        <Ionicons name="ios-camera-outline" size={55} color="black" />
        <Text>Take picture</Text>
        </TouchableOpacity>

        <View style={styles.verticleLine}></View>

        <ImagePickerScreen navigation={navigation}></ImagePickerScreen>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center"
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
    alignContent: "center",
    alignItems: "center",
    marginTop: 55,
    
  },
  verticleLine: {
    height: 1,
    width: 300,
    backgroundColor: '#909090',
    margin: 15
  }
});