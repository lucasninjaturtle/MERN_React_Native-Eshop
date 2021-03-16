import React, {useEffect, useState} from 'react'
import {Text, View, Button, StyleSheet, Dimensions} from 'react-native'
import {Item, Picker} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import FormContainer from '../../../Shared/Form/FormContainer'
import Input from '../../../Shared/Form/Input'

//npm install react-native-keyboard-aware-scroll-view
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

//REDUX
import { useSelector, useDispatch } from "react-redux";

var {width} = Dimensions.get("window");

const countries = require('../../../assets/data/countries.json')

const CheckOut = (props) =>{

    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState();
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();
    const [zip, setZip] = useState();
    const [country, setCountry] = useState();
    const [phone, setPhone] = useState();

    

//REDUX CartItems

const cartItems = useSelector(state => state.cartItems)


        

    //function to navigate  through component

    const checkOut = ()=>{
        let order={
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1:address,
            shippingAddress2:address2,
            zip,
        }

        props.navigation.navigate('Payment', {order: order})
    }

    return (
        <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
        >
            <Text style={styles.title}>{props.title} Shipping Address </Text>
                <Input
                placeholder={'Phone'}
                name={'Phone'}
                value={phone}
                keyboardType={'numeric'}
                onChangeText={(text) => setPhone(text)}
                />
                <Input
                placeholder={'Shipping Address'}
                name={'ShippingAddress'}
                value={address}
                
                onChangeText={(text) => setAddress(text)}
                />
                <Input
                placeholder={'Shipping Address 2'}
                name={'ShippingAddress2'}
                value={address2}
                onChangeText={(text) => setAddress2(text)}
                />
                <Input
                placeholder={'City'}
                name={'city'}
                value={city}
                onChangeText={(text) => setCity(text)}
                />
                <Input
                placeholder={'Zip Code'}
                name={'Zip'}
                value={zip}
                keyboardType={'numeric'}
                onChangeText={(text) => setZip(text)}
                />
                <Item picker>
                    <Picker
                    mode='dialog'
                    style={{width:undefined}}
                    selectedValue={country}
                    placeholder="Select your country"
                    placeholderStyle={{color:'#007aff'}}
                    placeholderIconColor='#007aff'
                    onValueChange={(e)=> setCountry(e)}
                    >
                        {countries.map(c=> {
                            return <Picker.Item
                            key={c.code}
                            label={c.name}
                            valule={c.name}
                            />
                        })}
                    </Picker>
                </Item>
                <View style={{width:'80%', alignItems:'center'}}>
                        <Button
                        title="Confirm"
                        onPress={()=> checkOut()}
                        />
                </View>
            
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    
    title:{
        textAlign:'center',
        marginTop:30,
        width:width,
        justifyContent:'center',
        alignContent:'center',
        fontSize:30,
        marginBottom:5

    },
    inactive:{
        backgroundColor:'#a0e1eb'
    }
})



export default CheckOut;