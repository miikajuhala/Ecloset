// open camera or select pic from library
// add clothes to closet with name etc info
import React from 'react';
import { Button, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { getAuth } from 'firebase/auth';
import { app } from "../../firebase"
import {AntDesign} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';




export default function AddclothesButton({navigation}) {

  const toAddClothes = () =>{
    navigation.navigate("AddClothes")
  }


  return (
    
      <ActionButton buttonColor='#9b59b6' position='center' title="New Task" onPress={()=>toAddClothes()}></ActionButton>
  

  );
}

