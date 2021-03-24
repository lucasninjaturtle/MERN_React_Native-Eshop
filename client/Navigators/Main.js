import React, {useContext} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View} from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'
import {Container, Icon} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import CartIcon from '../Shared/CartIcon'

//Stacks
import HomeNavigator from './HomeNavigator'
import CartNavigator from './CartNavigator'
import UserNavigator from './UserNavigator'
import AdminNavigator from './AdminNavigator'
import AuthGlobal from '../Context/store/AuthGlobal'



// import CalendarNavigator from '../Calendar/CalendarNavigator'
// import StatsNavigator from '../Stats/StatsNavigator'
// import ChatNavigator from '../Chat/ChatNavigator'

const Tab = createBottomTabNavigator();

const Main = () =>{

    const context = useContext(AuthGlobal)

    
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
            component={CartNavigator}
            options={{
                tabBarIcon:({color}) =>(
                    <View>
                    <Ionicons
                    name='cart'
                    color={color}
                    size={40}
                    />
                    <CartIcon/>
                    </View>
                )
            }}
            />
{context.stateUser.user.isAdmin == true ? (

<Tab.Screen
            name='Admin'
            component={AdminNavigator}
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

) : null}


<Tab.Screen
            name='User'
            component={UserNavigator}
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