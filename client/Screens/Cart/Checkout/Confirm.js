import React from 'react'
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native'
import {
    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body
} from 'native-base'


// //REDUX
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart, removeFromCart } from "../../Redux/Actions/cartActions";


var {height} = Dimensions.get("window");

const Confirm = (props) =>{

    const confirm = props.route.params

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize:20, fontWeight:'bold'}}> Confirm Order</Text>
                {props.route.params ? 
                <View style={{borderWidth:1, borderColor: 'blue'}}> 
                    <Text style={styles.title}> Shipping to: </Text>
                    <View>
                        <Text>Address: {confirm.order.order.shippingAddress1}</Text>
                        <Text>Address 2: {confirm.order.order.shippingAddress2}</Text>
                        <Text>City {confirm.order.order.city}</Text>
                        <Text>Zip Code: {confirm.order.order.zip}</Text>
                        <Text>Contry: {confirm.order.order.country}</Text>
                    </View>
                    {/* ITEMS */}
                    <Text style={styles.title}> items:</Text>


                </View>  
                : <Text> NO DATA PLEASE CORRECT YOUR ORDER</Text> 
            }

            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    
    container:{
        height: height,
        padding: 8,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'white'

    },
    titleContainer:{
        justifyContent:'center',
        alignItems:'center',
        margin:8

    },
    title:{
        alignSelf:'center',
        margin:8,
        fontSize:16,
        fontWeight:'bold'
    }
})



export default Confirm;