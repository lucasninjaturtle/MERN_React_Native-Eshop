
import React, { useEffect, useState} from 'react'
import {View, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { Container, Header, Icon, Item, Input, Text} from 'native-base'
import ProductList from "./ProductList"
import SearchedProduct from "./SearchedProducts"
import Banner from "../../Shared/Banner"
import CategoryFilter from './CategoryFilter'



const data = require ("../../assets/data/products.json")
const productsCategories = require('../../assets/data/categories.json')

const ProductContainer = (props) =>{

    const [products, setProducts] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([])
    const [focus, setFocus] = useState()
    const [categories, setCategories] = useState([])
    const [productsCtg, setProductsCtg] = useState([])
    const [active, setActive] = useState()
    const [initialState, setInitialState] = useState([])

    useEffect (()=>{
        setProducts(data)
        setProductsFiltered(data)
        setFocus(false)
        setCategories(productsCategories)
        setActive(-1)
        setInitialState(data)

        return () => {
            setProducts([])
            setProductsFiltered([])
            setFocus()
            setCategories([])
            setActive()
            setInitialState()
            
        }


    }, [])

    // Product Methods

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

    // Categories Methods

    const changeCtg = (ctg)=>{
        {
            ctg === 'all' ? [setProductsCtg(initialState), setActive(true)] : 
            [
                setProductsCtg(
                    products.filter((i) => i.category.$oid === ctg), setActive(true)
                )
            ]
        }

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
                navigation={props.navigation}
                productsFiltered={productsFiltered}
                
                />

            ) : (

    <View >
            <View>
                    <Banner/>

                    {/* CATEGORIE FILTER */}
                    <View>

                        <CategoryFilter
                        categories={categories}
                        CategoryFilter={changeCtg}
                        productsCtg={productsCtg}
                        active={active}
                        setActive={setActive}
                        />

                    </View>


                </View>
            <View style={{backgroundColor: 'gainsboro'}}>
                
            <FlatList
            
            data={products}
            numColumns={2}
            renderItem={({item}) => <ProductList 
            navigation={props.navigation}
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