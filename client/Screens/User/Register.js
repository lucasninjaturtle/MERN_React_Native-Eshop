import React, {useState} from 'react'
import {View, Text, StyleSheet, Dimensions, Button} from 'react-native';
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


var {width} = Dimensions.get("window");

const Register = (props) =>{

    const [email, setEmail] = useState('')
    const [password, setPasssword] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [name, setName] = useState('')


    //HandleSubmit

    const handleSubmit = ()=>{
        const user = {
            email,
            password
        }
        if (email === "" || password === ""){
            setError("Please fill in you credentials")
        }else{
            setError('')
            console.log('succes')
        }
    }

    return (

        <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
        >
            <Text style={styles.title}> Register </Text>
            <Input
            placeholder={'Enter Email'}
            name={"email"}
            id={'email'}
            value={email}
            onChangeText={(text)=> setEmail(text.toLowerCase())}
            />
            <Input
            placeholder={'Enter Name'}
            name={"name"}
            id={'name'}
            value={name}
            onChangeText={(text)=> setName(text)}
            
            />
            <Input
            placeholder={'Enter Phone Number'}
            name={"phone"}
            id={'phone'}
            value={phone}
            keyboardType={'numeric'}
            onChangeText={(text)=> setPhone(text)}
            
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
                        title="Register"
                        onPress={()=> handleSubmit()}
                        />
                </View>
                <View style={{width:'80%', alignItems:'center', textAlign:'center', marginTop:60}}>
                    <Button title={'Back to Login'} onPress={()=>props.navigation.navigate('Login')}/>
                </View>

                

</KeyboardAwareScrollView>



    )}



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
    

    export default Register;