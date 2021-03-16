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


//REDUX
import { useSelector, useDispatch } from "react-redux";

import {clearCart} from "../../../Redux/Actions/cartActions";


var {height, width} = Dimensions.get("window");

const Confirm = (props) =>{

    const dispatch = useDispatch();

    const cleanCart = () =>{
        dispatch(clearCart());
        
    }

    
//CONFIRM ORDER FUNCTION

    const ConfirmOrder = ()=>{


        setTimeout(()=>{
            cleanCart()
            props.navigation.navigate('Cart')
        })



    }


    
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