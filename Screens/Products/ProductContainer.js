import { useState } from "react"

import React from 'react'
import { useEffect} from "react"
import {View, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { Container, Header, Icon, Item, Input, Text} from 'native-base'
import ProductList from "./ProductList"
import SearchedProduct from "./SearchedProducts"
import Banner from "../../Shared/Banner"



const data = require ("../../assets/data/products.json")

const ProductContainer = () =>{

    const [products, setProducts] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([])
    const [focus, setFocus] = useState()

    useEffect (()=>{
        setProducts(data)
        setProductsFiltered(data)
        setFocus(false)

        return () => {
            setProducts([])
            setProductsFiltered([])
            setFocus()
            
        }


    }, [])

    const searchProduct = (text) =>{
        setProductsFiltered(
            products.filter(e => e.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const openList = () =>{
        setFocus(true)
    }
    const onBlur = () =>{
        setFocus(false)
    }

    return (
        <Container>

            <Header searchBar rounded>
                <Item>
                    <Icon name='ios-search'/>
                    <Input
                        placeholder='Search'
                        onFocus={openList}
                        onChangeText={(text)=> searchProduct(text) }
                        />

                        {focus == true ? (
                            <Icon onPress={onBlur} name="ios-close"/>
                        ) : null}
                </Item>
            </Header>
            {focus == true ? (
                <SearchedProduct
                
                productsFiltered={productsFiltered}
                
                />

            ) : (

    <View >
            <View>
                    <Banner/>
                </View>
            <View style={{backgroundColor: 'gainsboro'}}>
                
            <FlatList
            
            data={products}
            numColumns={2}
            renderItem={({item}) => <ProductList 
            key={item.id}
            item={item}

            />}
            keyExtractor={item => item.name}
            />
            </View>
        </View>
            )}
        
        </Container>
    )
}

export default ProductContainer;