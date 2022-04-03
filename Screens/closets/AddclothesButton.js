// open camera or select pic from library
// add clothes to closet with name etc info
import React from 'react';
import { Button, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { getAuth } from 'firebase/auth';
import { app } from "../../firebase"
import {AntDesign} from '@expo/vector-icons';




export default function AddclothesButton({navigation}) {

  const toAddClothes = () =>{
    navigation.navigate("AddClothes")
  }


  return (
    <TouchableHighlight  onPress={()=>toAddClothes()} style={{alignItems: "center"}}>
        <AntDesign name="pluscircle" size={60} color="black" />
    </TouchableHighlight>
  );
}

