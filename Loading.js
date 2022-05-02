import React from 'react';
import { Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

export default function Loading() {

 

  return (
    <View style={{alignContent: "flex-start", alignSelf:"center"}} >
        <Progress.Circle size={100} indeterminate={true} />
    </View>
  );
}




