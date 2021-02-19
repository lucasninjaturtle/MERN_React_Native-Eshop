import React from 'react'
import {TouchableOpacity, View, Dimensions} from 'react-native'
import ProductCard from './ProductCard'
//Touchable opacity es para todas las funciones touch del cel
//Diensions nos trae la dimension del disppositivo movil (para calcular de forma dinamica el estilo)

var {width} = Dimensions.get("window");

const ProductList = (props) =>{
const {item} = props;


    return (
        <TouchableOpacity style={{width: '100%'}}>
            <View style={{width: width/2,
                            backgroundColor: 'gainsboro',
                            flexWrap:'wrap'}}>

                <ProductCard {...item}/>
            </View>


        </TouchableOpacity>
    )
}

export default ProductList;