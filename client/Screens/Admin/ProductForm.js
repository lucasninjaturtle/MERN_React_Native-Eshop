import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Platform} from 'react-native'
import {Item, Picker, Button} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import Input from '../../Shared/Form/Input'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

//REDUX
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'


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


// FETCH DATA

useEffect(()=>{

    //categories
    axios
                .get(`http://192.168.0.13:3005/api/v1/categories`)
                .then(res =>{
                    setCategories(res.data)

                })
                .catch(err=> [alert('Error to load categories'), console.log(err)])

                return ()=>{
                    setCategories([])
                }
},[])

    return(
        
        <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
        style={styles.keybo}
        
        >
            <View >
               <Text style={{ fontSize:30, alignSelf:'center'}}>Add Product</Text>
           </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri:mainImage}}/>
                <TouchableOpacity style={styles.imagePicker}>
                    <Ionicons name='camera'/>
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
           <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Select the category</Text>
           </View>
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

           {err ? <Error message={err} /> : null}
           <View style={styles.buttonContainer}>
               <Button
                large
                primary
                onPress={() => addProduct()}               
               >
                   <Text style={styles.buttonText}>Confirm</Text>
               </Button>
           </View>

            
        </KeyboardAwareScrollView>

    )}

    const styles = StyleSheet.create({
        label: {
            width: "80%",
            marginTop: 10
        },
        buttonContainer: {
            width: "80%",
            marginBottom: 80,
            marginTop: 20,
            alignItems: "center",
            alignSelf:'center'
        },
        buttonText: {
            color: "white"
        },
        imageContainer: {
            width: 200,
            height: 200,
            borderStyle: "solid",
            borderWidth: 8,
            padding: 3,
            justifyContent: "center",
            borderRadius: 100,
            borderColor: "#E0E0E0",
            elevation: 10,
            marginLeft:40,
            marginTop:5,
        },
        image: {
            width: "100%",
            height: "100%",
            borderRadius: 100
        },
        imagePicker: {
            position: "absolute",
            right: 5,
            bottom: 5,
            backgroundColor: "grey",
            padding: 8,
            borderRadius: 100,
            elevation: 20
        },
        keybo:{
            alignSelf:'center',
            width:'85%',
            margin:5
        }
    })
    

    export default ProductForm