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
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Actions/cartActions";

//DIMNESIONS

const { height, width } = Dimensions.get("window");

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

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
                    USD {data.price}
                  </Text>
                </Right>
              </ListItem>
            );
          })}
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text> Your Cart is Empty</Text>
        </Container>
      )}
    </>

    // <View style={{flex:1}}>

    //     {cartItems.map(x=> {
    //         return(
    //             <Text>{x.name}</Text>
    //         )
    //     })}
    // </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Cart;
