import { Picker, PickerIOS } from "@react-native-picker/picker";
import React from "react";
import { Pressable, Text } from "react-native";
import { View } from "react-native-animatable";
import Collapsible from "react-native-collapsible";





export default function SelectGategory(props) {

    const [collapsed, setCollapsed] = React.useState(true);
    const [collapsed1, setCollapsed1] = React.useState(true);

    const toggleExpanded = () => {
        // Toggling the state of single Collapsible
        setCollapsed(!collapsed);
    };
    const toggleExpanded1 = () => {
        // Toggling the state of single Collapsible
        setCollapsed1(!collapsed1);
    };
    

    return (
        <>
        <View style={props.styles.topmenu}>
            <Pressable  onPress={()=>toggleExpanded()}>
                <Text style={props.styles.title1}>Select gategory</Text>
            </Pressable>
            <Pressable onPress={()=>toggleExpanded1()}>
                <Text style={props.styles.title1}>Select color</Text>
            </Pressable>
        </View>
        
        <View style={{alignContent: "flex-start", flexDirection: "row", margin:15}}>
            <Text style={{marginHorizontal: 5}} >{props.filterParam.gategory}</Text>
            <Text style={{marginHorizontal: 5}}>{props.filterParam.color}</Text>
        </View>
        

        <Collapsible
            collapsed={collapsed}
            align="center"
            >
            <PickerIOS
            selectedValue={props.filterParam.gategory}
            onValueChange={(itemValue, itemIndex) =>{
                props.setFilterParam({...props.filterParam, gategory: itemValue})
                toggleExpanded()
                }
            }>
            {props.gategories.map(gategory => 
                <Picker.Item label={gategory.label} value={gategory.value} />)
            }
            
            </PickerIOS>
        </Collapsible>

        <Collapsible
            collapsed={collapsed1}
            align="center"
            >
            <PickerIOS
            selectedValue={props.filterParam.color}
            onValueChange={(itemValue, itemIndex) =>{
                props.setFilterParam({...props.filterParam, color: itemValue})
                toggleExpanded1()
                }
            }>
            {props.colorData.map(color =>
                <Picker.Item label={color.label} value={color.color} />)
            }
            
            </PickerIOS>
        </Collapsible>
        </>
)}