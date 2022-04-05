import { createStackNavigator } from '@react-navigation/stack';
import AddClothesgg from './AddClothesgg';
import CameraComponent from './CameraComponent';
import Closet from './Closet';



const Stack = createStackNavigator()

export default function ClosetsNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Closet" component={Closet} />
            <Stack.Screen name="AddClothes" component={AddClothesgg} />
            <Stack.Screen name="Camera" component={CameraComponent} />
        </Stack.Navigator>
    )
}