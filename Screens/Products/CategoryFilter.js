import Reac from 'react'
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { ListItem, Badge, Text} from 'native-base'

const CategoryFilter = (props) => {

return (
    <ScrollView
    bouces={true}
    horizontal={true}
    style={{backgroundColor= 'grey'}}
    
    >
        <ListItem style={{margin: 0, padding: 0, borderRadius: 0}}>
            <TouchableOpacity
            key={1}
            //onPress=

            >
                <Badge
                style={[styles.center, {margin: 5}]}
                >
                    <Text styles={{color:'white'}}> NAME cat</Text>
                </Badge>
            </TouchableOpacity>
        </ListItem>

    </ScrollView>
)

}


const styles = StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center'
    }
})

export default CategoryFilter;