// navigation to 3 screens main, closets and something "3rd"
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Closets from './closets/Closets';
import Browsecombinations from './tryons/Browsecombinations';
import Login from './Login';
import {app}  from "../firebase"
import { MaterialCommunityIcons, AntDesign, FontAwesome5} from '@expo/vector-icons';
import Profile from './profile/Profile';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const Tab = createBottomTabNavigator();
const auth = getAuth(app)



export default function Navigation() {

  const [logged, setLogged] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true)
      }
      else{
        setLogged(false)
      }
    })
  })


  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
  
      if (route.name === 'Combinations') {
        return <MaterialCommunityIcons name="human-handsup" size={size} color="black" />
      } else if (route.name === 'Closets') {
        return <FontAwesome5 name="door-open" size={size} color="black" />
      }else if (route.name === 'Profile') {
        return <AntDesign name="user" size={size} color="black" />
      }
  
    }
  });


    if (logged) {
        return (
          <NavigationContainer>      
              <Tab.Navigator screenOptions={screenOptions}>
                  <Tab.Screen name="Combinations" component={Browsecombinations} options={{ headerShown: false}} />
                  <Tab.Screen name="Closets" component={Closets} options={{ headerShown: false}}  />
                  <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false}}/>
              </Tab.Navigator>
          </NavigationContainer>
        )
      } 
      else {
        return (
          <NavigationContainer>      
                <Tab.Navigator screenOptions={screenOptions}>
                    <Tab.Screen name="Login" component={Login} options={{ headerShown: false}}  />
                </Tab.Navigator>
          </NavigationContainer>
        );
      }
      
}