import React from 'react'
import { StyleSheet, TouchableOpacity, ScrollView, LogBox } from 'react-native'
import { ListItem, Badge, Text} from 'native-base'



const CategoryFilter = (props) => {

   
return (
    <ScrollView
    bouces={true}
    horizontal={true}
    style={{backgroundColor: 'grey'}}
    
    >
        <ListItem style={{margin: 0, padding: 0, borderRadius: 0}}>
            <TouchableOpacity
            key={1}
            onPress={()=>{
                props.CategoryFilter('all'), props.setActive(-1)
            }}

            >
                <Badge
                style={[styles.center, {margin: 5},
                    props.active == -1 ? styles.active : styles.inactive
                ]}
                >
                    <Text styles={{color:'white'}}>All</Text>
                </Badge>
            </TouchableOpacity>
            
            {/* MAP CATEGORIES */}

                {props.categories.map((item)=>(
                    <TouchableOpacity
                    key={item._id}
                    onPress={()=>{
                        props.CategoryFilter(item._id.$oid), 
                        props.setActive(props.categories.indexOf(item))
                    }}
        
                    >
                        <Badge
                        style={[styles.center, {margin: 5},
                            props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                        ]}
                        >
                            <Text styles={{color:'white'}}>{item.name}</Text>
                        </Badge>
                    </TouchableOpacity>
                ))}

        </ListItem>

    </ScrollView>
)

}


const styles = StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    active:{
        backgroundColor:'#03bafc',

    },
    inactive:{
        backgroundColor:'#a0e1eb'
    }
})

export default CategoryFilter;