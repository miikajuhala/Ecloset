import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { MaterialIcons } from '@expo/vector-icons';
import { Picker, PickerIOS } from "@react-native-picker/picker";
import colorData from "./colors";
import { set, ref as dbRef, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app, db, storage } from "../../firebase"

export default function ModalTester(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const [text, onChangeText] = useState("");
  const [color, setColor] = useState(props.color);

  const auth = getAuth(app);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getName =(i,name)=>{
    if(name==="" || name===null || name === undefined){
      if (i ===1)  return props.item[1].name
      if(i===2) return props.item[1].color
      
    }else{
      return name
    }
  }

  const savePictureToUser = ()=>{
    update(
      dbRef(db, 'users/' + auth.currentUser.uid+"/"+props.item[1].date), {
        name: getName(1,text),
        color: getName(2,color),
        userId: props.item[1].userId,
        pictureUrl: props.item[1].pictureUrl, 
        gategory: props.item[1].gategory,
        additionalInfo: props.item[1].additionalInfo,
        date: props.item[1].date
      }
  ).then(
    toggleModal()
  )
  }



  const deletePicture = ()=>{
    Alert.alert(
      "Delete item",
      "This item will be delted permanently",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () =>  
        set(
          dbRef(db, 'users/' + auth.currentUser.uid+"/"+props.item[0]), {
            userId: null,
            name: null,
            pictureUrl: null, 
            color: null,
            gategory: null,
            additionalInfo: null,
            date: null
          }
      )
    
      .catch(err => Alert.alert("Jokin meni pieleen",err)).then(
        toggleModal()
      ) }
      ]
    );
    
  }

  return (
    <View style={{ flex: 1 }}>
    <TouchableOpacity style={styles.text} onPress={toggleModal}>
        <Text>{props.item[1].name}</Text>
    </TouchableOpacity>
    

      <Modal isVisible={isModalVisible}>
        <View style={{marginTop: 55, backgroundColor: "white", borderRadius: 6}}>

          <Text>Change title</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder={props.item[1].name}
            keyboardType="default"
          />

          <Text>Change color</Text>
          <PickerIOS
            selectedValue={color}
            onValueChange={(itemValue, itemIndex) =>{
              setColor(itemValue)
            }
            }>
            {colorData.map(color1 =>
                <Picker.Item label={color1.label} value={color1.color} />)
            }
            
        </PickerIOS>
          
         
        <View style={styles.verticleLine}></View>

        <View style={styles.view}>
        <TouchableOpacity style={{marginRight: 140}} onPress={deletePicture}>
          <MaterialIcons name="delete-outline" size={44} color="red" />
        </TouchableOpacity>

        
        <Button title="Cancel" onPress={toggleModal} />
        <Button title="Save"   onPress={savePictureToUser} />
        
        </View>

        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    marginTop:0,
    borderWidth: 1,
    padding: 10,
    borderColor: "#e2e2e2",
    borderRadius: 5,
    width: '88%'
  },
  text: {
    height: 40,
    marginTop:0,
    borderWidth: 1,
    padding: 10,
    borderColor: "#e2e2e2",
    borderRadius: 5,
    borderTopEndRadius:0,
    borderTopStartRadius:0
  },
  verticleLine: {
    height: 1,
    width: 300,
    backgroundColor: '#909090',
    margin: 15
  },
  view: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 5
  }
});


