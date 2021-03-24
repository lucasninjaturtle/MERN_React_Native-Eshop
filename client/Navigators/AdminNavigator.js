import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Orders from '../Screens/Admin/Orders'
import Products from '../Screens/Admin/Products'
import ProductForm from '../Screens/Admin/ProductForm'
import Categories from '../Screens/Admin/Categories'


const Stack = createStackNavigator()

const MyStack = ()=>{


    return (
        <Stack.Navigator>
            <Stack.Screen
            name='Products'
            component={Products}
            options={{
                title:"Products",
                headerShown: false,
            }}
            />
            <Stack.Screen
            name='Categories'
            component={Categories}
            options={{
                title:'Categories',
                headerShown: false,
            }}
            />
            <Stack.Screen
            name='Orders'
            component={Orders}
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen
            name='Product Form'
            component={ProductForm}
            options={{
                headerShown: false,
            }}
            />
        </Stack.Navigator>
    )
}

export default function AdminNavigator(){
    return <MyStack/>
}
