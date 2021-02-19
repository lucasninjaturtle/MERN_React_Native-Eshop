import React from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'
import {Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base'

var {width} = Dimensions.get("window");



const SearchedProduct = (props) =>{

const {productsFiltered} = props;




    return(
        <Content style={{width: width}}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item)=>(

                    <ListItem
                    //onPress={navigation}
                    key={item._id$oid}
                    avatar
                    >
                        <Left>
                            <Thumbnail 
                            source={{uri: item.image ? item.image : 'https://images-ext-2.discordapp.net/external/Te2rXvX-VcMp4isU-ffJ-ykCJVIBZ8G0DQGyAN_Fp_U/https/cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png?width=645&height=458'}}
                            
                            
                            
                            />
                        </Left>
                        <Body>
                            <Text> {item.name}</Text>
                            <Text note>{item.description}</Text>
                        </Body>
                    </ListItem>

                
                ))
            ) : 
            
                    <View>
                        <Text style={{alignSelf: 'center'}}>
                            No products Match
                        </Text>
                    </View>
            
            
            }
            

        </Content>
    );
};

export default SearchedProduct;