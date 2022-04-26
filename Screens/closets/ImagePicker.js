import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
    <View style={{ flex: 1 }}>
      {!image && <Button title="Pick an image from camera roll" onPress={pickImage} />}
      {image && <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />}
      <View style={{flexDirection: "row", alignSelf: "center"}}>
        {image &&<Button title="use image" onPress={()=>savePicture()} />}
        {image && <Button title="Pick another image" onPress={pickImage} />}
      </View>
    </View>
  );
}