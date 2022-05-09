import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from "react-native";
import LoginGoogle from "../buttons/GoogleLogin";
import Image from "../assets/backroundi.jpg"

export default function Login({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const EmptyemailAndPassword = () => {
        setEmail('')
        setPassword('')
    }

    
    return (

    <View style={{
        flex: 1
    }}>

    <ImageBackground 
        style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        resizeMode="cover"
        source={Image}
    >  

<View style={{ marginBottom: 170}}>
    <Text style={styles.description}>Welcome to Ecloset</Text>

</View>
    <LoginGoogle navigation={navigation}/>


    </ImageBackground>
    </View>
    )
    

    
}
const styles = StyleSheet.create({
    header:{
    backgroundColor: "#9b59b6",
    height:200,
    },
    container: {
    flex:1,
    marginTop: 150,
    alignContent: "center",
    alignItems:"center",
    alignSelf:"center"
    },
    verticleLine: {
      height: 1,
      width: 300,
      backgroundColor: '#909090',
      margin: 15
    },
    avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
    },
    name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
    },
    body:{
    marginTop:40,
    },
    bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    },
    info:{
    fontSize:16,
    color: "#9b59b6",
    marginTop:10
    },
    description:{
    fontSize:35,
    color: "black",
    backgroundColor:"white",
    width: "80%",
   
    },
    
    buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#9b59b6",
    },
    buttonContainer1:{
      marginTop:40,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#9999FF",
    }
    });
    