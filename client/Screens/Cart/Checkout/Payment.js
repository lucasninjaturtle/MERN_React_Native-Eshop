import React, {useState} from 'react'
import {View, Button} from 'react-native'
import {
    Container,
    Header,
    Content,
    ListItem,
    Text,
    Radio,
    Right,
    Left,
    Picker,
    Icon,
    Body,
    Title
} from 'native-base'

const methods = [
    {name: 'Cash on Delivery', value: 1},
    {name: 'Bank Transfer', value: 2},
    {name: 'Bitcoin Payment',value:4},
    {name: 'MercadoPago',value:5},
    {name: 'Card Payment',value:3},
]

const paymentCards = [
    {name: 'Visa', value:1},
    {name: 'MasterCard', value:2}
 

]

const Payment = (props) =>{

    const order = props.route.params;

    const [selected, setSelected] = useState()
    const [card, setCard]= useState()


    return (
        <Container>
            <Header>
                <Body>
                    <Title>Choose you payment method</Title>
                </Body>
            </Header>
            <Content>
                {methods.map((item, index)=>{
                    return(
                        <ListItem
                        key={item.name}
                        onPress={()=>setSelected(item.value)}
                        >
                            <Left>
                                <Text>{item.name}</Text>
                            </Left>
                            <Right>
                                <Radio
                                selected={selected == item.value}
                                />
                            </Right>

                        </ListItem>
                    )
                })}
                {selected == 3 ? (
                    <Picker
                    mode='dropdown'
                    headerStyle={{backgroundColor: '#a8dadc'}}
                    headerBackButtonText={{color:'#fff'}}
                    headerTitleStyle={{color:'#fff'}}
                    selectedValue={card}
                    onValueChange={(x)=>setCard(x)}
                    >
                        {paymentCards.map((c, index)=>{
                            return(
                                <Picker.Item key={c.name} label={c.name} value={c.name}/>
                            )
                        })}
                    </Picker>
                ) : null}
                <View style={{marginTop:60, alignSelf:'center'}}>
                        <Button
                        title={'Confirm'}
                        onPress={()=> props.navigation.navigate('Confirm', {order:order})}
                        />

                </View>
            </Content>
        </Container>
    )
}

export default Payment;