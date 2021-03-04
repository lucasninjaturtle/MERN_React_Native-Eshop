import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import CheckOut from '../Screens/Cart/Checkout/CheckOut'
import Cart from '../Screens/Cart/Cart'

const Stack = createStackNavigator()

const MyStack = ()=>{


    return (
        <Stack.Navigator>
            <Stack.Screen
            name='Cart'
            component={Cart}
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen
            name='CheckOut'
            component={CheckOut}
            options={{
                title: 'Checkout',
            }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator(){
    return <MyStack/>
}