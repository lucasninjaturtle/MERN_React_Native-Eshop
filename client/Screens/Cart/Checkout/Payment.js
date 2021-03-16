import React, {useState} from 'react'
import {View, Button} from 'react-native'
import {
    Container,
    Header,
    Content,
    ListItem,
    Text,
    Radio,
    Right,
    Left,
    Picker,
    Icon,
    Body,
    Title
} from 'native-base'

const methods = [
    {name: 'Cash on Delivery', value: 1},
    {name: 'Bank Transfer', value: 2},
    {name: 'Card Payment',value:3},
    {name: 'Bitocoin Payment',value:4}
    
]

const Payment = () =>{
    return (
        <View>
        <Text>Payment</Text>
        </View>
    )
}

export default Payment;