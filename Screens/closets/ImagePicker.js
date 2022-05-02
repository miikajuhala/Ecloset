import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Touchable, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

export default function ImagePickerScreen({navigation}) {
  const [image, setImage] = useState(null);


  const savePicture =()=>{
    // setPreviewVisible(false)
    
    navigation.navigate("UsePicture",{capturedImage: image})
    // setCapturedImage(null)
  }



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      {!image && 
      <TouchableOpacity style={styles.btn} onPress={pickImage}> 
      <FontAwesome name="picture-o" size={55} color="black" />
      <Text>Select from images</Text>
      </TouchableOpacity>}

      {image && <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />}
      <View style={{flexDirection: "row", alignSelf: "center"}}>
        {image &&
        <TouchableOpacity  title="use image" onPress={()=>savePicture()}>
          <Text style={styles.btn1}>Use image</Text>
        </TouchableOpacity>
        }
        {image && 
          <TouchableOpacity title="use image"  onPress={pickImage}>
          <Text style={styles.btn1}>Pick another</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
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
    alignItems: "center"
  },
  btn1: {
    fontSize: 22,
    marginTop: 5,
    alignContent: "center",
    alignItems: "center",
    margin: 7,
    borderWidth: 1,
    borderColor:"grey",
    borderRadius: 7,
   
  },
});