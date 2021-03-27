import React, {useState} from 'react'
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native'
import {
    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body,
    Button
} from 'native-base'
import axios from 'axios'

//REDUX
import { useSelector, useDispatch } from "react-redux";

import {clearCart} from "../../../Redux/Actions/cartActions";

import Toast from 'react-native-toast-message'

var {height, width} = Dimensions.get("window");

const Confirm = (props) =>{

    const dispatch = useDispatch();

    const cleanCart = () =>{
        dispatch(clearCart());
        
    }

    const finalOrder = props.route.params;
//CONFIRM ORDER FUNCTION

    const ConfirmOrder = ()=>{


        const order = finalOrder.order.order;

        axios
        .post(`http://192.168.0.13:3005/api/v1/orders`, order)
        .then((res) => {
            if (res.status == 200 || res.status == 201) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Order Completed",
                    text2: "",
                })
                setTimeout(() => {
                    props.clearCart();
                    props.navigation.navigate("Cart")
                }, 500)
            }
        })
        .catch((error) => {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something went wrong",
                text2: "Please try again",
            })
        })



    }


    
    const confirm = props.route.params


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize:20, fontWeight:'bold'}}> Confirm Order</Text>
                {props.route.params ? 
                <View style={{borderWidth:3, borderColor: 'blue'}}> 
                    <Text style={styles.title}> Shipping to: </Text>
                    <View style={{padding:20}}>
                        <Text>Address: {confirm.order.order.shippingAddress1}</Text>
                        <Text>Address 2: {confirm.order.order.shippingAddress2}</Text>
                        <Text>City {confirm.order.order.city}</Text>
                        <Text>Zip Code: {confirm.order.order.zip}</Text>
                        <Text>Contry: {confirm.order.order.country}</Text>
                    </View>
                    {/* ITEMS */}
                    <Text style={styles.title}> items:</Text>
                    {confirm.order.order.orderItems.map((x)=>{
                        return(
                            <ListItem
                            style={styles.listItem}
                            avatar
                            >
                                <Left>
                                    <Thumbnail source={{uri:x.image}}/>
                                </Left>
                                <Body style={styles.body}>
                                    <Left>
                                        <Text>{x.name}</Text>
                                    </Left>
                                    <Right>
                                        <Text>$ {x.price}</Text>
                                    </Right>
                                    

                                </Body>

                            </ListItem>


                        )
                    })}


                </View>  
                : <Text> NO DATA PLEASE CORRECT YOUR ORDER</Text> 
            }


            {/* PLACE ORDER */}

            <View style={{alignItems:'center', margin:20}}>
                <Button onPress={()=>ConfirmOrder()}> 
                    <Text>place order</Text>
                </Button>

            </View>



              {/* PLACE ORDER */}
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    
    container:{
        
        height: height,
        padding: 8,
        justifyContent:'flex-start',
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
    },
    listItem:{
        width:width/1.2,
        alignItems:'center',
        backgroundColor:'white',
        justifyContent:'center',
    },
    body:{
        margin:10,
        alignItems:'center',
        flexDirection:'row',
    }
})



export default Confirm;