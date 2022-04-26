import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Button, Pressable, Dimensions } from "react-native";
import AddclothesButton from "../closets/AddclothesButton"

import {db, app} from '../../firebase'
import { getAuth } from 'firebase/auth';
import { Image } from 'react-native';
import { getDownloadURL, getStorage, ref as STORAGERef  } from 'firebase/storage'

import {DATA as EXAMPLEDATA} from "../closets/exampledata";
import {Picker, PickerIOS} from '@react-native-picker/picker';

import colorData from '../closets/colors';
import gategories from '../closets/gategories';
import SelectGategory from "../closets/SelectGategory";
import Carousel from 'react-native-anchor-carousel';


export default function Browsecombinations({navigation}) {

  const [selectedId, setSelectedId] = useState(null);
  const [clothes, setClothes] = useState([])
  const [sortedClothes, setSortedClothes] = useState(null)
  const [filterParam, setFilterParam] = useState({gategory: "", color: ""})

  const auth = getAuth(app);
  const storage = getStorage();

  const {width: windowWidth} = Dimensions.get('window');


 
  useEffect(() => {
    const starCountRef = ref(db, 'users/' + auth.currentUser.uid);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        // console.log(Object.entries(data)[0][1].color)
        if (data != null || data != undefined){
         setClothes(Object.entries(data))
        }
        else{
          
         setClothes(EXAMPLEDATA) 

        }

        if(sortedClothes === null){
          setSortedClothes(Object.entries(data))
        }
        // arr.push(data)

        // setClothes(arr[0])
          console.log("IN UE",Object.entries(data)) 
        
    });
},[])








const renderItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{uri:item[1].pictureUrl}}/>
    </View>
  );
};


 


  return (
   <View style={{flex:1, marginTop: 55}}>
    
    <Carousel
    style={{ height: 700}}
    data={clothes}
    renderItem={renderItem}
    itemWidth={windowWidth * 0.8}
    separatorWidth={0}
    containerWidth={windowWidth}
  />

    <Carousel
      style={{ height:700}}
      data={clothes}
      renderItem={renderItem}
      itemWidth={windowWidth * 0.8}
      separatorWidth={0}
      containerWidth={windowWidth}
    />
   <Carousel
     style={{ height: 400}}
      data={clothes}
      renderItem={renderItem}
      itemWidth={windowWidth * 0.8}
      separatorWidth={0}
      containerWidth={windowWidth}
    />

  </View>
  );
}







const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 155,
  },
  card:{
    marginVertical: 16,
    flexBasis: '90%',
    marginHorizontal: 5,
  },
   cardImage:{
     flex: 1,
    height: 200,
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

