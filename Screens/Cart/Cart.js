import React from 'react'
import {Text, View} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'



const Cart = (props) =>{

   const cartItems = useSelector(state => state.cartItems)
   const dispatch = useDispatch();

    // dispatch(nombreAction(value))
    // console.log(cartItems)
    return (
        <View style={{flex:1}}>
            
            
            {cartItems.map(x=> {
                return(
                    <Text>{x.name}</Text>
                )
            })}
        </View>
    )
}

export default Cart;