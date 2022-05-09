import { ImageBackground, Pressable, Alert } from "react-native";
 import GoogleImg from '../assets/google.png'
import * as Google from 'expo-google-app-auth';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithCredential, GoogleAuthProvider} from "firebase/auth";
import {app, db} from "../firebase"
import {ref, set, child, get } from "firebase/database"



export default function LoginGoogle({navigation}) {
    const auth = getAuth(app);

    function isUserEqual(googleUser, firebaseUser) {
      if (firebaseUser) {
      return false;
    }}

    function createUserToDb(){

      const dbRef = ref(db);
                  
      get(child(dbRef, `users/${auth.currentUser.uid}`)).then((snapshot) => {
        if (snapshot.exists() === false) {
            set(
              ref(db, 'users/' + auth.currentUser.uid), {
                  userId: auth.currentUser.uid,
                  
            })
        } else{
          console.log("no need for new user")
        }
      })
    }

    
    function onSignIn(googleUser) {
      // console.log('Google Auth Response', googleUser);
      // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          const credential = GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
          ); 
    
          // Sign in with credential from the Google user.
          signInWithCredential(auth, credential)
          .then((res=>{
                // check if sign in success
                // check if user already exists
                // if user already exists, skip -> if not create new user with set
                createUserToDb();
          }))
          .catch((error) => {
            // Handle Errors here.
            console.log(error.message);
          });
        } else {
          console.log('User already signed-in Firebase.');
        }
      });
    }
  



  
  async function signInWithGoogleAsync() {
    try {
        const result = await Google.logInAsync({
          behavior: "web",
          iosClientId: '633861353687-ji7jk2fuv0qnop9f4kir9cuped5l2db6.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
        });
  
        if (result.type === 'success') {
          onSignIn(result)
          return result.accessToken
          
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        return { error: true };
      }
  }


    return (

    


        <Pressable style={{
            width: '90%',
            height: 80,

        }}
          onPress={()=>{signInWithGoogleAsync()}}

        >
            <ImageBackground
                source={GoogleImg}
                style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center',
                   
                }}
                resizeMode="cover"
            >
            </ImageBackground>
        </Pressable>
    
      
    )
}