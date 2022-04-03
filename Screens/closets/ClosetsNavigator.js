import { createStackNavigator } from '@react-navigation/stack';
import AddClothesgg from './AddClothesgg';
import Closet from './Closet';



const Stack = createStackNavigator()

export default function ClosetsNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Closet" component={Closet} />
            <Stack.Screen name="AddClothes" component={AddClothesgg} />
        </Stack.Navigator>
    )
}