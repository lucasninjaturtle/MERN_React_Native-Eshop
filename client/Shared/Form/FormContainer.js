import React, {useState } from 'react'
import {ScrollView, Dimensions, StyleSheet, Text} from 'react-native'

var {width} = Dimensions.get("window");

const FormContainer = (props) =>{



    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{props.title} HOLA </Text>
            {props.childen}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        marginTop:30,
        marginBottom:400,
        width:width,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:30,

    },
    inactive:{
        backgroundColor:'#a0e1eb'
    }
})

export default FormContainer;