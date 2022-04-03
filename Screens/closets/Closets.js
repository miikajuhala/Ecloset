//display all closets available
// display option for also "all clothes"
import React from 'react';
import { Text, View } from 'react-native';
import {db, app} from '../../firebase'
import { getStorage, ref } from "firebase/storage";
import Closet from './Closet';



export default function Closets() {
  return (
   
        <View >
            {/* <Text>Closets page</Text> */}
            <Closet></Closet>

        </View>
   
  );
}
