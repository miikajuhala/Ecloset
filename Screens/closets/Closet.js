import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import AddclothesButton from "./AddclothesButton";
import {db, app} from '../../firebase'
import { getAuth } from 'firebase/auth';
import { Image } from 'react-native';

//tähän kuvat firebasesta id on id ja toiseks atribuutiks url
const DATA = [
  
  {
    id: "58694a0f-3da1-471f-bd96-145571e24559d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e2459d72",
    title: "Third Item",
  },
];



export default function Closet({navigation}) {
  const [selectedId, setSelectedId] = useState(null);
  const [clothes, setClothes] = useState(DATA)

  const auth = getAuth(app);

  useEffect(() => {
    const starCountRef = ref(db, 'users/' + auth.currentUser.uid);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        console.log(Object.entries(data)[0][1].color)
        setClothes(Object.entries(data))

        // arr.push(data)

        // setClothes(arr[0])
        // console.log(clothes)
        
    });
},[])


  //flatlist antaa yhden elementin kerallaan ja renderöi sen tässä
  const renderItem = ({ item }) => {
    // console.log(item)
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item)}
      />
    );
  };


  return (
   
    <SafeAreaView style={styles.container}>
      <FlatList
        data={clothes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // extraData={selectedId}
      />
      <AddclothesButton navigation={navigation} ></AddclothesButton>
    </SafeAreaView>
  
  );
}


const Item = ({ item, onPress}) => (
    
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    {/* //TODO: tähän image url on item.url yms */}
    <Image source={item[1].pictureUrl}></Image>
    

  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

