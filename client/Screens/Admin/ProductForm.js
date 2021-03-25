import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Platform} from 'react-native'
import {Item, Picker} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import Input from '../../Shared/Form/Input'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

//REDUX
import { useSelector, useDispatch } from "react-redux";


var {width} = Dimensions.get("window");

const ProductForm = (props)=>{

    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeature] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);

    return(
        
        <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
        
        >
            <View>
                <Image source={{uri:mainImage}}/>
                <TouchableOpacity>
                    <Text>IMAGE</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Brand</Text>
           </View>
                <Input
                placeholder={'Brand'}
                name={'brand'}
                id='brand'
                value={brand}
                onChangeText={(text) => setBrand(text)}
                />
                
                <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Name</Text>
           </View>
           <Input 
            placeholder="Name"
            name="name"
            id="name"
            value={name}
            onChangeText={(text) => setName(text)}
           />
            <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Price</Text>
           </View>
           <Input 
            placeholder="Price"
            name="price"
            id="price"
            value={price}
            keyboardType={"numeric"}
            onChangeText={(text) => setPrice(text)}
           />
            <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Count in Stock</Text>
           </View>
           <Input 
            placeholder="Stock"
            name="stock"
            id="stock"
            value={countInStock}
            keyboardType={"numeric"}
            onChangeText={(text) => setCountInStock(text)}
           />
            <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Description</Text>
           </View>
           <Input 
            placeholder="Description"
            name="description"
            id="description"
            value={description}
            onChangeText={(text) => setDescription(text)}
           />
           <Item picker>
                <Picker
                    mode="dropdown"
                    style={{ width: undefined }}
                    placeholder="Select your Category"
                    selectedValue={pickerValue}
                    placeholderStyle={{ color: "#007aff"}}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
                >
                    {categories.map((c) => {
                        return <Picker.Item key={c.id} label={c.name} value={c.id} />
                    })}
                </Picker>
           </Item>

            
        </KeyboardAwareScrollView>

    )}

    const styles = StyleSheet.create({
    
        title:{
            textAlign:'center',
            marginTop:30,
            width:width,
            justifyContent:'center',
            alignContent:'center',
            fontSize:30,
            marginBottom:5
    
        },
        inactive:{
            backgroundColor:'#a0e1eb'
        }
    })

    export default ProductForm