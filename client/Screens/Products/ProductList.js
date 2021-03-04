//Touchable opacity es para todas las funciones touch del cel
//Diensions nos trae la dimension del disppositivo movil (para calcular de forma dinamica el estilo)
import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';

import ProductCard from './ProductCard'

var { width } = Dimensions.get("window");

const ProductList = (props) => {
    const { item } = props;
    return(
        <TouchableOpacity 
        style={{ width: '50%' }}
        onPress={() => 
            props.navigation.navigate("Product Detail", { item: item})
        }
        >
            <View style={{ width: width / 2, 
                backgroundColor: 'gainsboro'}}
        >
            <ProductCard {...item} />
            </View>
        </TouchableOpacity>
    )
}

export default ProductList;
