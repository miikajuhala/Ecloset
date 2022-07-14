import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Button, Pressable, ImageBackground } from "react-native";
import AddclothesButton from "./AddclothesButton";

import {db, app} from '../../firebase'
import { getAuth } from 'firebase/auth';
import { Image } from 'react-native';
import exampledata from "../tryons/exampledata";
import { getDownloadURL, getStorage, ref as STORAGERef  } from 'firebase/storage'

import {Picker, PickerIOS} from '@react-native-picker/picker';

import colorData from './colors';
import gategories from './gategories';
import SelectGategory from "./SelectGategory";
import Loading from "../../Loading";
import favicon from "../../assets/load.gif"
import Modal from "react-native-modal";
import ModalTester from "./ModalTester";






export default function Closet({navigation}) {



  const [clothes, setClothes] = useState([])
  const [sortedClothes, setSortedClothes] = useState(null)
  const [filterParam, setFilterParam] = useState({gategory: "", color: ""})

  const auth = getAuth(app);


  const [info, setInfo] = useState(false)


 
  useEffect(() => {
    
    const starCountRef = ref(db, 'users/' + auth.currentUser.uid);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        
        if(data===undefined ||data===null || Object.entries(data)[0][1] ===auth.currentUser.uid || Object.entries(data)[0][1]===null || Object.entries(data)[0][1]===undefined) {
         setClothes(exampledata) 
         setInfo(true)
         setSortedClothes(exampledata)
        }
        else{
          setClothes(Object.entries(data))
          setSortedClothes(Object.entries(data))
          setInfo(false)
        }
    });
},[!sortedClothes, !filterParam])


// korvaa funktiolla mikä  launchataan samalla kun vaihetaan parametriä
useEffect(()=>{
  console.log("LAUNCHED")
  if(filterParam.gategory === "" && filterParam.color ===""){
    
    setSortedClothes(clothes)
    
  }

  else if(filterParam.gategory !== "" && filterParam.color ===""){
    const result = clothes.filter(type => type[1].gategory === filterParam.gategory)
    setSortedClothes(result)
    console.log("RESUKLTS:  ",result, filterParam,"filterparam state: " ,filterParam)
  }
  else if(filterParam.gategory === "" && filterParam.color !==""){
    const result = clothes.filter(type => type[1].color === filterParam.color)
    console.log("RESUKLTS:  ",result, filterParam,"filterparam state: " ,filterParam)
    setSortedClothes(result)
  }
  else{
    const result = clothes.filter(type => type[1].gategory === filterParam.gategory && type[1].color === filterParam.color)
    console.log("RESUKLTS:  ",result, filterParam,"filterparam state: " ,filterParam)
    // setFilterParam({gategory: filterParam.gategory, color: filterParam.color})
    setSortedClothes(result)
  }



},[filterParam])


 





  //flatlist antaa yhden elementin kerallaan ja renderöi sen tässä
  const renderItem = ({ item }) => {
    if(item[1].pictureUrl !== undefined){
    return (
      <View style={styles.card}>
      <ImageBackground style={styles.cardImage} source={favicon}>
        <Image
          style={styles.cardImage}
          source={{uri:item[1].pictureUrl}}
        >
        </Image>
        </ImageBackground>
        <ModalTester item={item}></ModalTester>
        
    
      </View>
    );
    }
  };


  return (
   <>
   
    <SafeAreaView style={styles.container}>
    <View>
      <SelectGategory  styles={styles} setFilterParam={setFilterParam} filterParam={filterParam} gategories={gategories} colorData={colorData} ></SelectGategory>
    </View>

    {info && <Text>Example images, add your own to display them</Text>}
      <FlatList
        data={sortedClothes}
        renderItem={renderItem} 
        keyExtractor={(item) => item[1].pictureUrl}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        // extraData={selectedId}
      />
    
       <AddclothesButton navigation={navigation} ></AddclothesButton>
    </SafeAreaView>

    
    
    </>
  );
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    height: 300
  },
  topmenu:{
    flexDirection: "row",
    alignContent: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
  },
  title1: {
    fontSize:22,
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 1,
    borderWidth: 1
  },
  container1:{
    flex:1,
    marginTop:20,
    backgroundColor:"#eee"
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    marginVertical: 8,
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    
  },
  cardImage:{
    flex: 1,
    height: 200,
    width: null,
    borderWidth:0.3,
    borderRadius:5
    ,borderColor: "black",
    borderBottomWidth: 0,
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0
  },
  /******** card components **************/
  share:{
    color: "#25b7d3",
  },
  icon: {
    width:25,
    height:25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    marginRight:10,
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 0,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }

});

