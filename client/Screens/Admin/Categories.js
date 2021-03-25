import React, { useEffect, useState } from "react"
import { 
    View, 
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet,
    ScrollView 
} from "react-native"
import {Button} from 'native-base'
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage"
import { add } from "react-native-reanimated";

var { width } = Dimensions.get("window")

const Item = (props) => {
    return (
        <View style={styles.item}>
            <Text>{props.item.name} - ID:{props.item._id}</Text> 
            <Button
                danger
                medium
                onPress={() => props.delete(props.item._id)}
            >
                <Text style={{ color: "white", fontWeight: "bold"}}>Delete</Text>
            </Button>
        </View>
    )
}

const Categories = (props) => {

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState();
    const [categoryColor, setCategoryColor] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));

        axios
        .get(`http://192.168.0.13:3005/api/v1/categories`)
        .then((res) => setCategories(res.data))
        .catch((error) => alert("Error to load categories"))

        return () => {
            setCategories();
            setToken();
        }
    }, [])

    const addCategory = () => {
        const category = {
            name: categoryName,
            color: `#${categoryColor}`
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
        .post(`http://192.168.0.13:3005/api/v1/categories`, category, config)
        .then((res) => setCategories([...categories, res.data]))
        .catch((error) => alert("Error to load categories"));

        setCategoryName("");
        setCategoryColor("");
    }

    const deleteCategory = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
        .delete(`http://192.168.0.13:3005/api/v1/categories/${id}`, config)
        .then((res) => {
            const newCategories = categories.filter((item) => item.id !== id);
            setCategories(newCategories);
        })
        .catch((error) => alert("Error to load categories"));
    }

    return (
        <ScrollView style={{ position: "relative", height: "100%"}}>
            <View style={{ marginBottom: 60 }}>
                <FlatList 
                    data={categories}
                    renderItem={({ item, index }) => (
                        <Item item={item} index={index} delete={deleteCategory} />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.bottomBar}>
                <View>
                    <Text>Add Category</Text>
                </View>
                <View style={{ width: width / 2.5 }}>
                    <TextInput 
                        value={categoryName}
                        style={styles.input}
                        placeholder={'Category name'}
                        onChangeText={(text) => setCategoryName(text)}
                    />
                   
                </View>

                <View >
                    
                    <TextInput 
                        value={categoryColor}
                        style={styles.input}
                        placeholder={'Color number'}
                        onChangeText={(text) => setCategoryColor(text)}
                    />
                </View>
               
                <View>
                    <Button
                        medium
                        primary
                        onPress={() => addCategory()}
                    >
                        <Text style={{ color: "white", fontWeight: "bold"}}>Submit</Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: "white",
        width: width,
        height: 60,
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1
    },
    item: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 5,
        margin: 5,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5
    }
})

export default Categories;