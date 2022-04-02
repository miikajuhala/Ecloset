//display all closets available
// display option for also "all clothes"
import React from 'react';
import { Text, View } from 'react-native';
import {db, app} from '../../firebase'
import { getStorage, ref } from "firebase/storage";
import Closet from './Closet';



export default function Closets() {
  return (
    <View style={{
        flex: 1,
    }}>
        <View style={{ marginTop:50 }}>
            <Text>Closets page</Text>
            <Closet></Closet>
          
        </View>
    </View>
  );
}
