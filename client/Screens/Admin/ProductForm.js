import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Platform} from 'react-native'
import {Item, Picker, Button} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import Input from '../../Shared/Form/Input'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-community/async-storage"
import axios from "axios"

//REDUX
import { useSelector, useDispatch } from "react-redux";


//npm install expo-image-picker
import * as ImagePicker from "expo-image-picker"

// npm install mime
import mime from "mime";


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

    //FILLING DATA ON MOIFY product
    if(!props.route.params) {
        setItem(null);
    } else {
        setItem(props.route.params.item);
        setBrand(props.route.params.item.brand);
        setName(props.route.params.item.name);
        setPrice(props.route.params.item.price.toString());
        setDescription(props.route.params.item.description);
        setMainImage(props.route.params.item.image);
        setImage(props.route.params.item.image);
        setCategory(props.route.params.item.category._id);
        setCountInStock(props.route.params.item.countInStock.toString());
    }

    //GETTING TOKEN

    AsyncStorage.getItem("jwt")
    .then((res) => {
        setToken(res)
    })
    .catch((error) => console.log(error))

    //categories
    axios
                .get(`http://192.168.0.13:3005/api/v1/categories`)
                .then(res =>{
                    setCategories(res.data)

                })
                .catch(err=> [alert('Error to load categories'), console.log(err)]);


    // Image Picker DATA

    (async () =>{
        if(Platform.Os !== 'web'){
            const{
                status,
            } = await ImagePicker.requestCameraPermissionsAsync()
            if (status !== 'granted'){
                alert('Sorry! we need camera permissions in order this to work :)')
            }
        }
    })();

                return ()=>{
                    setCategories([])
                }
},[])

// ONPRESS picking image
const pickImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        //size
        aspect:[4, 3],
        quality:1
    })
    if(!result.cancelled){
        setMainImage(result.uri)
        setImage(result.uri)
    }
}

//VALIDATION ADD PRODUCT

const addProduct = () => {
    if (
        name == "" ||
        brand == "" ||
        price == "" ||
        description == "" ||
        category == "" ||
        countInStock == ""
    ) {
        setError("Please fill in the form correctly")
    }
    
        let formData = new FormData();

        const newImageUri = "file:///" + image.split("file:/").join("");

        formData.append("image", {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        });
        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        formData.append("richDescription", richDescription);
        formData.append("rating", rating);
        formData.append("numReviews", numReviews);
        formData.append("isFeatured", isFeatured);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }
        console.log(item)
        if(item !== null) {
            axios
            //ITS NOT WORKING.... THE PUT (see backend)
            .put(`http://192.168.0.13:3005/api/v1/products/${item.id}`, formData, config)
            .then((res) => {
                if(res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Product successfuly updated",
                        text2: ""
                    });
                    // setTimeout(() => {
                    //     props.navigation.navigate("Products");
                    // }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: `Please try again ${error}`
                })
            })
        } else {
            axios
            .post(`http://192.168.0.13:3005/api/v1/products/`, formData, config)
            .then((res) => {
                if(res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "New Product added",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Products");
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                })
            })
        } 

}

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
                
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
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