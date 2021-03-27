import React, { useContext } from "react";
import { View, Dimensions, TouchableOpacity, StyleSheet, Animated } from "react-native";
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  Button,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import CartUnit from './CartUnit.js'
import AuthGlobal from '../../Context/store/AuthGlobal'

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "../../Redux/Actions/cartActions";


import { SwipeListView } from 'react-native-swipe-list-view';



//DIMNESIONS

const { height, width } = Dimensions.get("window");

const Cart = (props) => {
  //total cart

  let total = 0;
  
  const context = useContext(AuthGlobal)
//REDUX CARtITEMS
  //REDUX
  const cartItems = useSelector(state => state.cartItems)
  const dispatch = useDispatch();
  
  // dispatch(nombreAction(value))
  // console.log(cartItems)

  // REDUX functions

  const cleanCart = () =>{
      dispatch(clearCart());
   
  }

  const remFromCart = props =>{
    dispatch(removeFromCart(props));
 
}

  //TOTAL cartITEM

  cartItems.forEach(cart=>{
    return total+= cart.price
  })

 
  
  return (
    //   This <>  and </> to close is called react Fragment, this doesnt take a node on HTMLAllCollection, and its used on react to encapsulete and not taking HTML space
    <>
      {cartItems.length ? (
        
        <Container>
          <H1 style={{ alignSelf: "center", marginTop:60 }}>Cart</H1>
          
          <SwipeListView
            data={cartItems}
            renderItem=
            {(data)=>(
            <CartUnit style={{backgroundColor:'blue'}}item={data}/> 
            )}
            renderHiddenItem=
            {(data)=>( 
              <View style={styles.hiddenContainer}>
                <TouchableOpacity style={styles.hiddenButton}
                onPress={()=>remFromCart(data.item)}
                > 
                  <Ionicons 
                  name='trash-outline'
                  color={'white'}
                  size={30}
                  />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
        
          <View style={styles.bottommContainer}>
            <Left>
              <Text style={styles.price}> ${total}</Text>
            </Left>
            <Right>
            <Button
            danger={true}
            onPress={()=>cleanCart()}
            >
            <Text>Clear Cart</Text>
          </Button>
            </Right>
            <Right>
              {context.stateUser.isAuthenticated ? (

<Button title='Checkout' 
onPress={()=>props.navigation.navigate('Checkout')}>
  <Text>CheckOut</Text>
</Button>

              ) : 
              
              <Button title='Login' 
onPress={()=>props.navigation.navigate("Login")}>
  <Text>Log In First</Text>
</Button>
              }
              
            </Right>


          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text> Your Cart is Empty</Text>
        </Container>
      )}
    </>

    
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  bottommContainer:{
    flexDirection:'row',
    position:'absolute',
    bottom:0,
    left:0,
    backgroundColor:'white',
    elevation: 20,
},
price:{
    fontSize:18,
    margin:20,
    color:'red',
},
hiddenContainer: {
  flex: 1,
  justifyContent: 'flex-end',
  flexDirection: 'row'
},
hiddenButton: {
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'flex-end',
  paddingRight: 25,
  height: 70,
  width: width / 1.3
},
rowBack: {
  alignItems: 'center',
  backgroundColor: 'grey',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: 15,
},
backRightBtn: {
  alignItems: 'center',
  bottom: 0,
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  width: 75,
},
backRightBtnRight: {
  backgroundColor: 'red',
  right: 0,
}
});

export default Cart;
