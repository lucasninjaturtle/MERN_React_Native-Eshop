import React from 'react'
import {StyleSheet} from 'react-native'
import {
    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body,
    Container
} from 'native-base'



const CartUnit = (props) =>{
    const data = props.item.item
    // console.log(data)



    return (
      <Container>
        <ListItem 
              thumbnail
              style={styles.ListItem}
              key={Math.random()}
              >
                <Left>
                  <Thumbnail 
                  square 
                  source={{uri: data.image ? data.image : 'https://images-ext-2.discordapp.net/external/Te2rXvX-VcMp4isU-ffJ-ykCJVIBZ8G0DQGyAN_Fp_U/https/cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png?width=645&height=458'}}
                  />
                </Left>
                <Body style={styles.body}>
                  <Text>{data.name}</Text>
                  
                </Body>
                <Right>
                <Text note numberOfLines={1}>
                    $ {data.price}
                  </Text>
                </Right>
              </ListItem>
              </Container>
    )
}

const styles = StyleSheet.create({
  listItem: {
      alignItems: 'center',
      backgroundColor: 'blue',
      justifyContent: 'center'
  },
  body: {
      margin: 3,
      alignItems: 'center',
      flexDirection: 'row'
  }
})


export default CartUnit;