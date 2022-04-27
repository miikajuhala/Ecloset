
import React from 'react';
import { Button, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableHighlight, View , TouchableWithoutFeedback, PlatformView, TextInput , Platform, ImageBackground, Pressable  } from 'react-native';

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { app, db, storage } from "../../firebase"
import { getAuth } from 'firebase/auth';

import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colorData from './colors';
import gategories from './gategories';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';

import icon from '../../assets/icon.png'
import { MaterialCommunityIcons, AntDesign, Ionicons} from '@expo/vector-icons';
import { set, ref as dbRef } from 'firebase/database';
import ActionButton from 'react-native-action-button';



export default function UsePicture({ route, navigation }) {

const [color, setColor]=React.useState("black")
const [text, onChangeText] = React.useState("");
const [title, onChangeTitle] = React.useState("");
const [gategory, setGategory] = React.useState("gategory");
const [collapsed, setCollapsed] = React.useState(true);
const [collapsed1, setCollapsed1] = React.useState(true);

const auth = getAuth(app);
const uri = route.params.capturedImage


const toggleExpanded = () => {
  // Toggling the state of single Collapsible
  setCollapsed(!collapsed);
};
const toggleExpanded1 = () => {
  // Toggling the state of single Collapsible
  setCollapsed1(!collapsed1);
};






    async function savePicture() {
        const blob = await new Promise((resolve, reject) => {
            console.log("1")
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          console.log("2")
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          console.log("3")
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
        console.log("4")
        const ref1 = ref(storage,("images/"+auth.currentUser.uid+"/"+Date.now()));
        uploadBytes(ref1, blob).then((snapshot) => {
            console.log("5")
          //  console.log(snapshot);
        // ota firebase url vastaan ja tallenna se url käyttäjälle + nimi +väri kuvalle
        // snapshot.metadata.fullPath


        const starsRef = ref(storage, snapshot.metadata.fullPath)
        getDownloadURL(starsRef)
          .then((url) => {
            console.log("TÄSSSÄ VITTUSAATATANANANNAN",url)
            console.log("6")
            savePictureToUser(url);
        })

        });
        
        blob.close();
      }

      

      const savePictureToUser = (picurl)=>{

        set(
          dbRef(db, 'users/' + auth.currentUser.uid+"/"+Date.now()), {
            userId: auth.currentUser.uid,
            name: title,
            pictureUrl: picurl, 
            color: color,
            gategory: gategory,
            additionalInfo: text
          }
      )
      .catch(err => Alert.alert("Jokin meni pieleen",err))
        // save pic to realtime database 
        //   user/currentuser.uid/images/imagename : color: color, gategory: gategory, url: "gs://sizefinder-7d214.appspot.com/images/"+imagename
        console.log("7")
        navigation.navigate("Closet")
      }


      const ItemLogo = () =>{
        return(
          <View style={{display: "flex", flexDirection: "row"}}>
            <Ionicons name="shirt-outline" size={24} color="black" />
            <MaterialCommunityIcons name="shoe-formal" size={24} color="black" />
          </View>
        );
      }




  return (

  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, marginTop:50}}>
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <>
        
     <ScrollView style={{flex: 1}}>
        <Text style={styles.text}>Name & Brand</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholder="Some nice title"
          keyboardType="default"
        />

        <Text style={styles.text}>Color </Text>

        {/* <Button color={color} title={color} onPress={()=>toggleExpanded()}>ff</Button> */}

        <Pressable 
          style={{
          width: '88%',height: 60, margin: 10 }}
          onPress={()=>toggleExpanded()}
        >
          <View style={{alignContent: "center", justifyContent: "center", alignItems:"center", backgroundColor: "white",  borderWidth: 1,
            borderRadius: 5, borderColor: "#e2e2e2"
          }}>
            <AntDesign style={{marginTop:5}} name="checkcircleo" size={24} color={color} />
            <Text>{color}</Text>
          </View>
        </Pressable>


        <Collapsible
          collapsed={collapsed}
          align="center"
        >
            <RadioButtonRN
              // box={false}
              animationTypes={["rotate"]}
              data={colorData}
              selectedBtn={(e) => {
                setColor(e.color)
                setTimeout(() => {
                    toggleExpanded()
                  }, 1000);
              }}
              icon={
                  <Icon
                    name="check-circle"
                    size={25}
                    color={color}
                  />
                }
            />
        </Collapsible>
        
        <Text style={styles.text}>Gategory </Text>

          <Pressable 
            style={{width: '88%',height: 60, margin: 10 }}
            onPress={()=>toggleExpanded1()}
          >
          <View style={{backgroundColor: "white",  borderWidth: 1,
            borderRadius: 5, borderColor: "#e2e2e2", alignItems:"center"
          }}>
            <ItemLogo></ItemLogo>
            <Text>{gategory}</Text>
          </View>
        </Pressable>

        <Collapsible
          collapsed={collapsed1}
          align="center"
        >
            
            <RadioButtonRN
                animationTypes={["rotate"]}
                data={gategories}
                selectedBtn={(e) => {
                  setGategory(e.value)
                  setTimeout(() => {
                    toggleExpanded1()
                  }, 1000);
                 

                  
                }}
                icon={
                    <Icon
                      name="check-circle"
                      size={25}
                      color={color}
                    />
                  }
              />
        </Collapsible>
              

        <Text style={styles.text}>Additional information</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Additional information"
          keyboardType="default"
        />




        


      </ScrollView>
      
        {/* <Button  title='Save to closet' onPress={()=>savePicture()}></Button> */}
        <ActionButton buttonColor={color} size={75} position='center' style={{bottom:0}} title="New Task" onPress={()=>savePicture()}></ActionButton>
       
      </>
      </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
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
    marginTop: 12,
    marginLeft:12,
    fontSize: 16
  
  },
});