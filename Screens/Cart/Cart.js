import React, { Fragment } from "react";
import { View, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
  Button,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../Redux/Actions/cartActions";

//DIMNESIONS

const { height, width } = Dimensions.get("window");

const Cart = (props) => {
  //total cart

  let total = 0;
  

//REDUX CARtITEMS
  //REDUX
  const cartItems = useSelector(state => state.cartItems)
  const dispatch = useDispatch();

  // REDUX functions

  const cleanCart = () =>{
      dispatch(clearCart());
   
  }

  //TOTAL cartITEM

  cartItems.forEach(cart=>{
    return total+= cart.price
  })

  // dispatch(nombreAction(value))
  // console.log(cartItems)
  return (
    //   This <>  and </> to close is called react Fragment, this doesnt take a node on HTMLAllCollection, and its used on react to encapsulete and not taking HTML space
    <>
      {cartItems.length ? (
        
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
          {cartItems.map((data) => {
            return (
              <ListItem 
              thumbnail
              style={styles.ListItem}
              key={Math.random(1000000)}
              >
                <Left>
                  <Thumbnail 
                  square 
                  source={{uri: data.image ? data.image : 'https://images-ext-2.discordapp.net/external/Te2rXvX-VcMp4isU-ffJ-ykCJVIBZ8G0DQGyAN_Fp_U/https/cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png?width=645&height=458'}}
                  />
                </Left>
                <Body>
                  <Text>{data.name}</Text>
                  
                </Body>
                <Right>
                <Text note numberOfLines={1}>
                    $ {data.price}
                  </Text>
                </Right>
              </ListItem>
            );
          })}
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
              <Button title='Checkout' 
              onPress={()=>props.navigation.navigate('Checkout')}>
                <Text>CheckOut</Text>
          </Button>
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
}
});

export default Cart;
