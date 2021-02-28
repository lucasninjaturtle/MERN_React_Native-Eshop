import React, {useState, useEffect } from 'react'
import {Image, View, StyleSheet, text, ScrollView, Button} from 'react-native'
import {Left, Right, Container, H1} from 'native-base'

const SingleProduct = (props)=>{
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('') 

    return (
        <Container
        style={styles.containter}
        >
            <ScrollView style={{marginBottom:80, padding:5}}>
                <View>
                    <Image
                    source={{uri: item.image ? item.image : 'https://images-ext-2.discordapp.net/external/Te2rXvX-VcMp4isU-ffJ-ykCJVIBZ8G0DQGyAN_Fp_U/https/cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png?width=645&height=458'}}
                    resizeMode='contain'
                    style={styles.image}
                    />
                </View>
            </ScrollView>

        </Container>
    )
}

const styles = StyleSheet.create({
    containter:{
        position:'relative',
        height:'100%'
    },
    imageContainer:{
        backgroundColor:'white',
        padding:0,
        margin:0
    },
    image:{
        width:'100%',
        height:250
    }
})


export default SingleProduct;