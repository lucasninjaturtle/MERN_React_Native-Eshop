import React from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button,
} from 'react-native'

//REDUX
import {useSelector, useDispatch} from 'react-redux'
import {addToCart} from '../../Redux/Actions/cartActions'

var {width} = Dimensions.get("window");

const ProductCard = (props) =>{

    
    //Compopnent PROPS
    const {name, price, image, url, countInStock } = props;

    //REDUX
    const cartItems = useSelector(state => state.cartItems)
   const dispatch = useDispatch();

   // REDUX functions

   const addItemToCart = props =>{
       dispatch(addToCart(props));
    
   }


    return (
            <View style={styles.container}>
                <Image 
                style={styles.image}
                resizeMod='contain'
                source={{uri: image ? image : 'https://images-ext-2.discordapp.net/external/Te2rXvX-VcMp4isU-ffJ-ykCJVIBZ8G0DQGyAN_Fp_U/https/cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png?width=645&height=458'}}
                />
                <View style={styles.card}/>
                <Text style={styles.title}>
                    {name.length > 15 ? name.substring(0, 15 - 3)
                    + "..." : name}
                </Text >
                <Text style={styles.price}> ${price}  </Text>

                {countInStock > 0 ? (
                    <View>
                        <Button 
                        title={'Add'} 
                        color={'green'}
                        onPress={()=>addItemToCart(props)}
                        />
                    </View>

                ) : <Text style={{marginTop: 20}}> Out Of Stock</Text>}
            </View>



    )
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center'
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})

export default ProductCard;