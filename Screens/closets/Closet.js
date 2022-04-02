//display all closets available
// display option for also "all clothes"
import React from 'react';
import { Text, View } from 'react-native';
import {db, app} from '../../firebase'
import { getStorage, ref } from "firebase/storage";
import useDb from './useDb';


export default function Closet() {

    const { docs } = useDb('images');


  return (
    <View style={{
        flex: 1,
    }}>
        <View style={{ marginTop:50 }}>
            <Text>Closet</Text>
        </View>
        {docs && docs.map(doc => (
            <Text>{doc.url}</Text>
        ))}
    </View>
  );
}
