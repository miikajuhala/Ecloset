import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAuth } from 'firebase/auth';
import { app } from "../../firebase"
import LoginGoogle from '../../buttons/GoogleLogin';


export default function Profile({navigation}) {

  const auth = getAuth(app);
  
  function googleSignout() {
    auth.signOut()
   
    .then(function() {
       console.log(auth)
    }, function(error) {
       console.log('Signout Failed')  
    });
 }

  return (
    <View style={styles.container}>
    <Text style={styles.description}>Profile</Text>
      <View style={styles.body}>
        <View style={styles.bodyContent}>

      
      <TouchableOpacity onPress={()=>googleSignout()} style={styles.buttonContainer1}>
            <Text>Change user</Text>  
      </TouchableOpacity> 

        <View style={styles.verticleLine}></View>
                   
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Buy premium</Text> 
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>googleSignout()} style={styles.buttonContainer}>
            <Text>Sign out</Text>  
          </TouchableOpacity>   
        </View>
    </View>
  </View>
  );
}



const styles = StyleSheet.create({
header:{
backgroundColor: "#9b59b6",
height:200,
},
container: {
flex:1,
marginTop: 150,
alignContent: "center",
alignItems:"center",
alignSelf:"center"
},
verticleLine: {
  height: 1,
  width: 300,
  backgroundColor: '#909090',
  margin: 15
},
avatar: {
width: 130,
height: 130,
borderRadius: 63,
borderWidth: 4,
borderColor: "white",
marginBottom:10,
alignSelf:'center',
position: 'absolute',
marginTop:130
},
name:{
fontSize:22,
color:"#FFFFFF",
fontWeight:'600',
},
body:{
marginTop:40,
},
bodyContent: {
flex: 1,
alignItems: 'center',
padding:30,
},
info:{
fontSize:16,
color: "#9b59b6",
marginTop:10
},
description:{
fontSize:18,
color: "#696969",
marginTop:10,
textAlign: 'center'
},

buttonContainer: {
marginTop:10,
height:45,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
marginBottom:20,
width:250,
borderRadius:30,
backgroundColor: "#9b59b6",
},
buttonContainer1:{
  marginTop:40,
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:250,
  borderRadius:30,
  backgroundColor: "#9999FF",
}
});
