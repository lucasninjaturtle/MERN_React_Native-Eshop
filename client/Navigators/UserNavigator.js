import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import userProfile from '../Screens/User/userProfile'



const Stack = createStackNavigator()

const MyStack = ()=>{


    return (
        <Stack.Navigator>
            <Stack.Screen
            name='Login'
            component={Login}
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen
            name='Register'
            component={Register}
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen
            name='User profile'
            component={userProfile}
            options={{
                headerShown: false,
            }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator(){
    return <MyStack/>
}
