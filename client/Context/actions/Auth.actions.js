// npm install jwt-decode
// npm install @react-native-community/async-storage

import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage'
import Toast from "react-native-toast-message";



// axios
//         // .get(`${baseURL}products`)
//         //192.168.0.13:3005
//         .get('http://192.168.0.13:3005/api/v1/products')
//         .then(res=>{


export const SET_CURRENT_USER = 'SET_CURRENT_USER';


export const loginUser = (user, dispatch) =>{
    fetch(`http://192.168.0.13:3005/api/v1/users/login`,{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json"
        }
    })
    .then((res)=> res.json())
    .then((data)=>{
        if(data){
            const token = data.token;
            AsyncStorage.setItem('jwt', token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded, user))
        }else{
            logoutuser(dispatch)
        }
    })
    .catch(err=>{
        Toast.show({
            topOffset:60,
            type:'error',
            text1: 'Please provide correct credentials',
            text2:''
        })
        logoutuser(dispatch)
    })


}


export const getUserProfile = (id) =>{
    fetch(`http://192.168.0.13:3005/api/v1/users/${id}`,{
        method:'GET',
        body:JSON.stringify(user),
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json"
        },
    })
    .then(res=>res.json())
}

export const logoutuser = (dispatch) =>{
    AsyncStorage.removeItem('jwt');
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) =>{
    return{
        type:SET_CURRENT_USER,
        payload: decoded,
        userProfile:user
    }
}