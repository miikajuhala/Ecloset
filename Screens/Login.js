import { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import LoginGoogle from "../buttons/GoogleLogin";


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
        
                <View style={{
                    marginTop:50,
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'white',
                    alignItems: 'center'               
                }}> 
                    {/* <Text style={{ fontSize: 25 }}>Kirjaudu sisään</Text>
                    <TextInput 
                        placeholder="Käyttäjänimi tai email"
                        keyboardType="email-address"
                        style={{
                            width: '80%',
                            backgroundColor: 'white',
                            opacity: 0.7,
                            borderColor: 'grey',
                            borderWidth: 1,
                            marginTop: 10
                        }}
                        onChangeText={username => setEmail(username)}
                        value={email} 
                    />
                    <TextInput 
                        placeholder="Salasana"
                        style={{
                            width: '80%',
                            backgroundColor: 'white',
                            opacity: 0.7,
                            borderColor: 'grey',
                            borderWidth: 1,
                            marginTop: 10
                        }}                     
                        onChangeText={pass => setPassword(pass)}
                        value={password}  
                    />
                    <View style= {{ margin: 20, width: '80%' }}>
                        <LoginButton email={email} password={password} empty={EmptyemailAndPassword} />
                    </View>
                    <View style= {{ marginBottom: 20, width: '80%' }}>
                        <Button 
                            title="Rekisteröidy" 
                            onPress={() => navigation.navigate("Rekisteröidy")}
                        /> */}
                    {/* </View> */}
                    <View  style={{
                    marginTop:50
                    }}>
                        <Text>...tai rekisteröidy / kirjaudu käyttämällä:</Text>
                    </View>
                    <LoginGoogle/>

                </View>
            
        </View>
    )
    

    
}