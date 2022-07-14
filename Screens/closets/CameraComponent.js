import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { ref, uploadBytes } from "firebase/storage";
import { app, db, storage } from "../../firebase"
import { NavigationContainer } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CameraComponent({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)


  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let camera = Camera


  const retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    // __startCamera()
  }

  const savePicture =()=>{
    // setPreviewVisible(false)
    console.log(capturedImage.uri)
    navigation.navigate("UsePicture",{capturedImage: capturedImage.uri})
    // setCapturedImage(null)
  }

  return (
    <>
    {previewVisible &&
      <CameraPreview photo={capturedImage}  retakePicture={retakePicture} savePicture={savePicture}></CameraPreview>
    }
    {!previewVisible &&
   
      <Camera style={styles.camera} type={type} ref={(r) => {
            camera = r
          }}>
      
        <View style={styles.buttonContainer }>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name="md-camera-reverse-outline" size={35} color="white" />

          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer2 }>
        <TouchableOpacity
            style={styles.button}
            onPress={
              async () => {
                  if (!camera) return
                  const photo = await camera.takePictureAsync()
                  setPreviewVisible(true)
                  setCapturedImage(photo)
                  console.log(photo)
                }
            }>
            <Entypo name="circle" size={55} color="white" />
          </TouchableOpacity>
          </View>
      </Camera>
    }
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 20,
    marginLeft: 25,
    alignItems: "flex-start"
  },
  buttonContainer2: {
    flex: 1,
    bottom:0,
    position:"absolute",
    backgroundColor: 'transparent',
    borderColor: "red",
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    color: "red"
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  actionButton: {
    
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      position: 'absolute',
      bottom: 20,
      left: 100,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 100,
    
  },
  actionButton2: {
    
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 20,
    right: 100,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 100,
  
},
});



const CameraPreview = (props) => {
  console.log('sdsfds', props.photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: props.photo && props.photo.uri}}
        style={{
          flex: 1
        }}
      />
   
    <TouchableOpacity
      onPress={()=>props.savePicture()}
      style={styles.actionButton}
    > 
      <Ionicons name="checkmark" size={35} color="green" />
    </TouchableOpacity>

    <TouchableOpacity
      onPress={()=>props.retakePicture()}
      style={styles.actionButton2}
    >
      <Ionicons name="arrow-undo-sharp" size={35} color="red" />
    </TouchableOpacity>
   
</View>

  )
}