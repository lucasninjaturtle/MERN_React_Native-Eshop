import React from 'react'
import { StyleSheet, Image, SafeAreaView, View} from 'react-native'



const Header = () =>{

    return(

        <View style={styles.header}>
            <Image
                source={require('../assets/favicon.png')}
                resizeMode='contain'
                style={{height:50}}
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