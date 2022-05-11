import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Button, Pressable, Dimensions } from "react-native";
import AddclothesButton from "../closets/AddclothesButton"

import {db, app} from '../../firebase'
import { getAuth } from 'firebase/auth';
import { Image } from 'react-native';
import { getDownloadURL, getStorage, ref as STORAGERef  } from 'firebase/storage'
import exampledata from "./exampledata";

import Carousel from 'react-native-anchor-carousel';
import Loading from "../../Loading";


export default function Browsecombinations({navigation}) {

  const [selectedId, setSelectedId] = useState(null);
  const [clothes, setClothes] = useState([])

  const [shirts, setShirts] = useState(null)
  const [pants, setPants] = useState(null)
  const [shoes, setShoes] = useState(null)

  const [loaded, setLoaded] = useState(false)
  const [info, setInfo] = useState(false)

  const [filterParam, setFilterParam] = useState({gategory: "", color: ""})

  const auth = getAuth(app);
  const storage = getStorage();

  const {width: windowWidth} = Dimensions.get('window');


 
  useEffect(() => {
    const starCountRef = ref(db, 'users/' + auth.currentUser.uid);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        let clothesArray;


        if(data===undefined ||data===null || Object.entries(data)[0][1] ===auth.currentUser.uid ||Object.entries(data)[0][1]===null ||Object.entries(data)[0][1]===undefined){
          clothesArray = exampledata;
          setInfo(true)
        
        }else{
          clothesArray = Object.entries(data)
          setInfo(false)
        }

      
          
        const shirts1 = clothesArray.filter(type => type[1].gategory === "Shirts" || type[1].gategory === "T-shirts" || type[1].gategory ===  "Sweatshirts & Hoodies" ||  type[1].gategory === 'Jackets')
        setShirts(shirts1)
      

        const pants1 = clothesArray.filter(type => type[1].gategory === 'Jeans' ||  type[1].gategory === 'Trousers' ||  type[1].gategory === 'Shorts' || type[1].gategory === 'Joggers')
        setPants(pants1)
      

        const shoes1 = clothesArray.filter(type => type[1].gategory ==='Shoes')
        setShoes(shoes1)
    
        
        
    });
},[])



const renderItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image onLoad={()=>setLoaded(true)}  style={styles.cardImage} source={{uri:item[1].pictureUrl}}/>
    </View>
  );
};

const renderItem2 = ({ item }) => {
  return (
    <View style={styles.card2}>
      <Image onLoad={()=>setLoaded(true)}  style={styles.cardImage} source={{uri:item[1].pictureUrl}}/>
    </View>
  );
};
 


  return (
   <View style={{flex:1, marginTop: 55, backgroundColor: "#d3d3d3",margin:5, alignSelf:"center", marginBottom: 5}}>

    {!loaded && <Loading></Loading>}
    {info && <Text>Example images, add your own in closet page</Text>}

    <Carousel
      style={{ marginTop:2}}
      data={shirts}
      renderItem={renderItem}
      itemWidth={windowWidth * 0.8}
      separatorWidth={0}
      containerWidth={windowWidth}
    />

    <Carousel
      data={pants}
      renderItem={renderItem}
      itemWidth={windowWidth * 0.8}
      separatorWidth={0}
      containerWidth={windowWidth}
    />
   <Carousel
      style={{ marginBottom: 4}}
      data={shoes}
      renderItem={renderItem2}
      itemWidth={windowWidth * 0.8}
      separatorWidth={0}
      containerWidth={windowWidth}
    />

  </View>
  );
}







const styles = StyleSheet.create({

  card:{
    marginVertical: 16,
    // flexBasis: '95%',
    marginHorizontal: 5,
    height:250
  },
  card2:{
    marginHorizontal: 5,
    height:150
  },
   cardImage:{
    flex: 1,
    // height: 200,
    borderWidth:1,
    borderRadius:8
  },
  title: {
    fontSize: 32,
  },
  title1: {
    fontSize:22,
    // marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 1,
    borderWidth: 1
  },

});

