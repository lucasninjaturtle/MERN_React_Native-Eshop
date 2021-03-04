import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

//REDUX
import { useSelector } from "react-redux";

const CartIcon = (props) => {
  //REDUX CARtITEMS
  const cartItems = useSelector((state) => state.cartItems);

  return (
    <>
      {cartItems.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{cartItems.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    top: -4,
    right: -15,
  },
  text: {
    fontSize: 12,
    width: 100,
    fontWeight: "bold",
  },
});

export default CartIcon;
