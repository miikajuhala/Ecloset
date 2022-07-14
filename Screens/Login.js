import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from "react-native";
import LoginGoogle from "../buttons/GoogleLogin";
import Image from "../assets/backroundi.png"

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
        }}
        resizeMode="cover"
        source={Image}
    >  

        <View style={{alignSelf: "center", marginTop: "20%"}}>
            <Text style={styles.description}>Ecloset</Text>

        </View>
        
        
        <View style={{alignSelf: "center", marginTop: "80%"}}> 
        <View style={styles.verticleLine}></View>
            <LoginGoogle navigation={navigation}/>
        </View>
    </ImageBackground>
    </View>
    )
    

    
}
const styles = StyleSheet.create({
   
    description:{
    fontSize:70,
    color: "lightgrey",
    width: "80%",
    },
    verticleLine: {
        height: 1.5,
        width: 300,
        backgroundColor: '#909090',
        margin: 15
    }
});
    