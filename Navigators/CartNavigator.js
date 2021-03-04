import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Cart from '../Screens/Cart/Cart'

//Checkooutnavigator to go to Payment, Confirm and shipping.
import Checkooutnavigator from './CheckoutNavigator'
import CheckoutNavigator from './CheckoutNavigator'


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
            name='Checkout'
            component={CheckoutNavigator}
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
