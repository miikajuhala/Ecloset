import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import AddclothesButton from "./AddclothesButton";
import {db, app} from '../../firebase'
import { getAuth } from 'firebase/auth';
import { Image } from 'react-native';
import { getDownloadURL, getStorage, ref as STORAGERef  } from 'firebase/storage'
import {DATA as EXAMPLEDATA} from "./exampledata";



export default function Closet({navigation}) {

  const [selectedId, setSelectedId] = useState(null);
  const [clothes, setClothes] = useState()

  const auth = getAuth(app);
  const storage = getStorage();

  useEffect(() => {
    const starCountRef = ref(db, 'users/' + auth.currentUser.uid);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        // console.log(Object.entries(data)[0][1].color)
        if (data != null || undefined){
         setClothes(Object.entries(data))
        }
        else{
          setClothes(EXAMPLEDATA)
        }
        // arr.push(data)

        // setClothes(arr[0])
          console.log(Object.entries(data))
        
    });
},[])


// const  getImage = (urli)=>{
//   const starsRef = STORAGERef(storage, urli);
//   let urli2
//   // Get the download URL
//   getDownloadURL(starsRef)
//     .then((url) => {
//       console.log("TÄSSSÄ VITTUSAATATANANANNAN",url)
//       urli2=url
  
//   })

//   return(
//     urli2+"rer"
//   );

// }


const Item = ({ item, onPress}) => (
  
  <View style={styles.card}>
  <Image style={styles.cardImage} source={{uri:item[1].pictureUrl}}/>
  {/* <View style={styles.cardFooter}>
    <View style={styles.socialBarContainer}>
      <View style={styles.socialBarSection}>
        <TouchableOpacity style={styles.socialBarButton}>
          <Image style={styles.icon} source={{uri: 'https://png.icons8.com/flat_round/50/000000/share.png'}}/>
          <Text style={[styles.socialBarLabel, styles.share]}>Share</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialBarSection}>
        <TouchableOpacity style={styles.socialBarButton}>
          <Image style={styles.icon} source={{uri: 'https://png.icons8.com/color/50/000000/hearts.png'}}/>
          <Text style={styles.socialBarLabel}>{item[1].name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View> */}
  </View>
);






  //flatlist antaa yhden elementin kerallaan ja renderöi sen tässä
  const renderItem = ({ item }) => {
    //  console.log(item)
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item)}
      />
    );
  };


  return (
   
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>All clothes</Text>
      <FlatList
        data={clothes}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        // extraData={selectedId}
      />
      
      <AddclothesButton navigation={navigation} ></AddclothesButton>
    </SafeAreaView>
  
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
  title: {
    fontSize: 32,
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

