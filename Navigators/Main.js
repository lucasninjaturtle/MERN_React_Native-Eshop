import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View} from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'
import {Icon} from 'native-base'
import { Ionicons } from '@expo/vector-icons'

//Stacks
import HomeNavigator from './HomeNavigator'


// import CalendarNavigator from '../Calendar/CalendarNavigator'
// import StatsNavigator from '../Stats/StatsNavigator'
// import ChatNavigator from '../Chat/ChatNavigator'

const Tab = createBottomTabNavigator();

const Main = () =>{

    
    return(
        <Tab.Navigator 
        initialRouteName='Home'
        tabBarOptions={{
            // keyboardHidesTabBar=true,
            // showLabel=false,
            activeTintColor: '#e63946',
          inactiveTintColor: 'black',
          style: {
            backgroundColor: '#a8dadc',
        
          },
        }}
        
        >
            <Tab.Screen
            name="Home"
            component={HomeNavigator}
            options={{
                tabBarIcon:({color}) =>(
                    <Ionicons
                    name='home'
                    style={{position:'relative'}}
                    color={color}
                    size={40}
                    />
                )
            }}
            />
            <Tab.Screen
            name='Cart'
            component={HomeNavigator}
            options={{
                tabBarIcon:({color}) =>(
                    <Ionicons
                    name='cart'
                    color={color}
                    size={40}
                    />
                )
            }}
            />

<Tab.Screen
            name='Admin'
            component={HomeNavigator}
            options={{
                tabBarIcon:({color}) =>(
                    <Ionicons
                    name='cog'
                    color={color}
                    size={40}
                    />
                )
            }}
            />

<Tab.Screen
            name='User'
            component={HomeNavigator}
            options={{
                tabBarIcon:({color}) =>(
                    <Ionicons
                    name='person-outline'
                    color={color}
                    size={40}
                    />
                )
            }}
            />
        </Tab.Navigator>
    )
}

export default Main;