import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getAuth } from 'firebase/auth';
import { app } from "../../firebase"


export default function Profile() {

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
    <View style={{
        flex: 1,
    }}>
        <View style={{ marginTop:50 }}>
            <Text>Profile page</Text>
            <Button title='SignOut' onPress={()=>googleSignout()}></Button>

        </View>
    </View>
  );
}

