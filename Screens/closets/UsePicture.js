
import React from 'react';
import { Button, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { ref, uploadBytes } from "firebase/storage";
import { app, db, storage } from "../../firebase"
import { getAuth } from 'firebase/auth';

export default function UsePicture({ route, navigation }) {

const [name, setName]=React.useState("")
const auth = getAuth(app);
const  uri = route.params.capturedImage

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
        const ref1 = ref(storage,("images/"+auth.currentUser.uid+"/ggimagessdsdhghgsffs"));
        uploadBytes(ref1, blob).then((snapshot) => {
            console.log("5")
        //   console.log(snapshot);
        // ota firebase url vastaan ja tallenna se url käyttäjälle + nimi +väri kuvalle
        // snapshot.metadata.fullPath
         savePictureToUser(snapshot.metadata.fullPath);
        });
        console.log("6")
        blob.close();
      }

      const savePictureToUser = (gg)=>{
        // save pic to realtime database 
        //   user/currentuser.uid/images/imagename : color: color, gategory: gategory, url: "gs://sizefinder-7d214.appspot.com/images/"+imagename
        console.log("7")
      }


  return (
    //   Radio button for selecting color
    //   Radio button for selecting gategory
    //   text area for additional information

    <>
   <Text>ff</Text>
   <Button title='Save to closet' onPress={()=>savePicture()}></Button>
   </>
  );
}

