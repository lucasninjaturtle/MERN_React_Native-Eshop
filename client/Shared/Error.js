import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

const Error = (props) =>{


    return(
        <View style={{width:'100%', alignItems:"center", margin:10}}>
            <Text style={{color:'red'}}>{props.message}</Text>
        </View>
    )}




export default Error;