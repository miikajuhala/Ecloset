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
            <Text style={styles.description}>Ecloset</Text>

        </View>
        
        <LoginGoogle  navigation={navigation}/>

    </ImageBackground>
    </View>
    )
    

    
}
const styles = StyleSheet.create({
   
    description:{
    fontSize:55,
    color: "#484848",
    width: "80%",

    }
    });
    