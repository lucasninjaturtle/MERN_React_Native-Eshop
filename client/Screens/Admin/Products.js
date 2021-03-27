import React,{useState, useCallback}  from 'react'
import {View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, ScrollView} from 'react-native'
import {Header, Item, Input, Button} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useFocusEffect} from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import ListItem from './ListItem'
import { Ionicons } from '@expo/vector-icons'

var {height, width} = Dimensions.get('window')

const ListHeader = () =>{
    return(
        <View
        elavation={1}
        style={styles.listHeader}
        >
            <View style={styles.headerItem}></View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight:'700'}}>Brand</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight:'700'}}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight:'700'}}>Category</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight:'700'}}>Price</Text>
            </View>
        </View>
    )
}

const Products = (props)=>{
    const [productList,setProductList] = useState()
    const [productFilter, setProductFilter] = useState()
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState()

    useFocusEffect(
        useCallback(
            ()=>{
                //Get token
                AsyncStorage.getItem('jwt')
                .then((res)=>{
                    setToken(res)
                })
                .catch(err => console.log(err))
                //call
                axios
                .get(`http://192.168.0.13:3005/api/v1/products`)
                .then(res =>{
                    setProductList(res.data)
                    setProductFilter(res.data)
                    setLoading(false);

                })

                return ()=>{
                    setProductList()
                    setProductFilter()
                    setLoading(true)
                }
            },
            [],
        )
    )


    //handleSerach

    const searchProduct = (text)=>{
        if(text == ''){
            setProductFilter(productList)

        }
        setProductFilter(
            productList.filter((i)=>
            i.name.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    // DELETE PRODUCT

    const deleteProduct = (id) =>{
        axios
        .delete(`http://192.168.0.13:3005/api/v1/products/${id}`,{
            headers: {Authorization: `Bearer ${token}`},
        })
        .then((res)=>{
            let products = productFilter.filter((item)=>item.id)
            setProductFilter(products)
        })
        .catch(err => console.log(err))
    }

    return(
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                primary
                medium
                style={{margin:10, backgroundColor:'#a8dadc'}}
                onPress={()=>props.navigation.navigate('Orders')}
                >
                    <Ionicons
                    name="cart"
                    size={18}
                    color='black'
                    />
                    <Text style={styles.buttonText}>Orders</Text>
                </Button>

                <Button
                secondary
                medium
                style={{margin:10, backgroundColor:'#a8dadc'}}
                onPress={()=>props.navigation.navigate('Product Form')}
                >
                    <Ionicons
                    name="add"
                    size={18}
                    color='black'
                    />
                    <Text style={styles.buttonText}>Products</Text>
                </Button>

                <Button
                secondary
                medium
                style={{margin:10, backgroundColor:'#a8dadc'}}
                onPress={()=>props.navigation.navigate('Categories')}
                >
                    <Ionicons
                    name="add"
                    size={18}
                    color='black'
                    />
                    <Text style={styles.buttonText}>Categories</Text>
                </Button>

            </View>

            {/* BUTTON CONTAINER FINISH */}
            <View style={{marginTop:-15}} >
                <Header transparent={true} searchBar rounded >
                    <Item style={{ marginLeft:5, marginTop:-5 }}>
                        <Icon name="search"/>
                        <Input
                            placeholder='search by product'
                            onChangeText={(text)=> searchProduct(text)}
                        />
                    </Item>
                </Header>
            </View>

            
            {loading ? (
                <View>
                    <ActivityIndicator size='large' color='red' />

                    </View>
                    
            ): (

                
                <ScrollView>
                    <ListHeader/>
                    {productFilter.map((item, index)=>{
                        return(
                            <ListItem
                            {...item}
                            navigation={props.navigation}
                            key={item.id}
                            delete={deleteProduct}
                            />
                        )
                    })}
</ScrollView>


            )}
        
        </View>
    )}

    const styles = StyleSheet.create({
        listHeader:{
            flexDirection:'row',
            padding:5,
            backgroundColor:"gainsboro",

        },
        headerItem:{
            width:width / 6,
            margin:3,
        },
        container:{
            marginBottom:20,
            backgroundColor:'white',
            marginTop:60
        
        },
        buttonContainer:{
            margin:5,
            marginBottom:-1,
            alignSelf:'center',
            flexDirection:'row',
        },
        buttonText:{
            marginLeft: 4,
            color:'#003049',
            fontWeight:'bold',
            padding:10
        }
    })
    

    export default Products