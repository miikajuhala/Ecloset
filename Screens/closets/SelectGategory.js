import { Picker, PickerIOS } from "@react-native-picker/picker";
import React, { useEffect } from "react";
import { Pressable, StatusBar, StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import Collapsible from "react-native-collapsible";
import { Ionicons } from '@expo/vector-icons';




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
        <View style={styles.topmenu}>
            <Pressable style={styles.item} onPress={()=>toggleExpanded()}>
                <Text style={styles.title1}>Gategory</Text>
            </Pressable>
            <Pressable onPress={()=>toggleExpanded1()}>
                <Text style={styles.title1}>Color</Text>
            </Pressable>
        </View>
        
        <View style={{alignContent: "flex-start", flexDirection: "row", margin:15}}>
            <Pressable hitSlop={10} style={styles.pres} onPress={()=>props.setFilterParam({...props.filterParam, gategory: ""})}> 
                <Text style={{marginLeft: 7, marginRight: 1}} >{props.filterParam.gategory}</Text>
                {props.filterParam.gategory!=="" && <Ionicons name="remove-circle-outline" size={12} color="red" />}
            </Pressable>
            <Pressable hitSlop={10} style={styles.pres} onPress={()=>props.setFilterParam({...props.filterParam, color: ""})}> 
                <Text style={{marginLeft: 20, marginRight: 1}}>{props.filterParam.color}</Text>
                {props.filterParam.color!=="" && <Ionicons name="remove-circle-outline" size={12} color="red" />}
            </Pressable> 
        </View>
        

        <Collapsible
            collapsed={collapsed}
            align="center"
            >
            <PickerIOS
            selectedValue={props.filterParam.gategory}
            onValueChange={(itemValue, itemIndex) =>{
                props.setFilterParam({...props.filterParam, gategory: itemValue})
                setTimeout(() => {
                    toggleExpanded()
                }, 700);
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
                setTimeout(() => {
                    toggleExpanded1()
                }, 700);
                }
            }>
            {props.colorData.map(color =>
                <Picker.Item label={color.label} value={color.color} />)
            }
            
            </PickerIOS>
        </Collapsible>
        </>
)}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      margin: 1,
      marginBottom: 4
    },
    pres: {
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row"
      },
    topmenu:{
      flexDirection: "row",
      borderRadius: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      width:"100%",
      alignItems: "center",
      alignContent: "center",
      textAlign: "center",
      alignSelf: "center"
      
    },
    title: {
      fontSize: 32,
    },
    title1: {
      fontSize:22,
      marginTop: 5,
      marginHorizontal: 10,
    //   borderRadius: 1,
    //   borderWidth: 1
    },
    
  
  });
  