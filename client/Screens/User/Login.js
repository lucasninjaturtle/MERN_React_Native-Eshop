import React,{useState} from 'react'
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'

var {width} = Dimensions.get("window");

const Login = (props) =>{

    const [email, setEmail] = useState('')
    const [password, setPasssword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = ()=>{
        const user = {
            email,
            password
        }
        if (email === "" || password === ""){
            setError("Please fill in you credentials")
        }else{
            setError('')
            console.log('success')
        }
    }

    return (

        <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
        >
            <Text style={styles.title}>{props.title} LOGIN </Text>
            <Input
            placeholder={'Enter Email'}
            name={"email"}
            id={'email'}
            value={email}
            onChangeText={(text)=> setEmail(text.toLowerCase())}
            />
            <Input
            placeholder={'Enter Password'}
            name={"password"}
            id={'password'}
            secureTextEntry={true}
            value={password}
            onChangeText={(text)=> setPasssword(text)}
            
            />

                <View style={{width:'80%', alignItems:'center', textAlign:'center'}}>
                    {error ? <Error message={error}/> : null}
                        <Button
                        title="Log In"
                        onPress={()=> handleSubmit()}
                        />
                </View>

                <View style={{width:'80%', alignItems:'center', textAlign:'center'}}>

                    <Text style={{marginBottom:20, alignSelf:'center'}}>
                        Don't have an account yet? Register Now!
                    </Text>
                        <Button
                        title="Register"
                        onPress={()=> props.navigation.navigate('Register')}
                        />
                </View>

</KeyboardAwareScrollView>


    )
}

const styles = StyleSheet.create({
    
    title:{
        textAlign:'center',
        marginTop:30,
        width:width,
        justifyContent:'center',
        alignContent:'center',
        fontSize:30,
        marginBottom:5

    },
    inactive:{
        backgroundColor:'#a0e1eb'
    }
})



export default Login;

