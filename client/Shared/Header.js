import React from 'react'
import { StyleSheet, Image, SafeAreaView, View} from 'react-native'



const Header = () =>{

    return(

        <View style={[styles.header, {backgroundColor:'transparent'}]}>
            <Image
                source={require('../assets/favicon.png')}
                resizeMode='contain'
                style={{height:20, backgroundColor:'transparent'}}
            />
        </View>



    )
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection:'row',
        padding: 20,
        alignContent:"center",
        justifyContent:'center'        
    }
})

export default Header;