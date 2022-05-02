import { createStackNavigator } from '@react-navigation/stack';
import AddClothesgg from './AddClothesgg';
import CameraComponent from './CameraComponent';
import Closet from './Closet';
import ImagePickerScreen from './ImagePicker';
import usePicture from './UsePicture';



const Stack = createStackNavigator()

export default function ClosetsNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Closet" component={Closet} options={{ headerShown: false}}/>
            <Stack.Screen name="AddClothes" component={AddClothesgg} options={{ title:""}}/>
            <Stack.Screen name="Camera" component={CameraComponent}  options={{ title:""}} />
            <Stack.Screen name="UsePicture" component={usePicture}   options={{ title:""}} />
            <Stack.Screen name="ImagePickerScreen" component={ImagePickerScreen} options={{ title:""}}/>
            
        </Stack.Navigator>
    )
}