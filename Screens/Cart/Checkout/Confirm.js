import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import {
    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body,

} from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/cartActions';

import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../../../assets/common/baseUrl';


var { width, height } = Dimensions.get('window')

const Confirm = (props) => {
    const finalOrder = props.route.params;

    // Add this
    const [productUpdate, setProductUpdate] = useState();
    useEffect(() => {
        if(finalOrder) {
          getProducts(finalOrder);
        }
      return () => {
        setProductUpdate();
      };
    }, [props]);
  
    // Add this
    const getProducts = (x) => {
      const order = x.order.order;
      var products = [];
      if(order) {
          order.orderItems.forEach((cart) => {
              axios
                .get(`${baseURL}products/${cart.product}`)
                .then((data) => {
                  products.push(data.data);
                  setProductUpdate(products);
                })
                .catch((e) => {
                  console.log(e);
                });
            });
      }
      
    };

    const confirmOrder = () => {
        const order = finalOrder.order.order;
        axios
        .post(`${baseURL}orders`, order)
        .then((res)=>{
            if(res.status == 200 || res.status == 201){
                Toast.show({
                    topOffset:60,
                    type: "success",
                    text1: "Order Completed",
                    text2:""
                })
                setTimeout(() => {
                    props.clearCart();
                    props.navigation.navigate("Cart")
        
                }, 500)
            }
        }).catch((error)=>{
            Toast.show({
                topOffset:60,
                type: "error",
                text1: "Something went wrong",
                text2: "Please try again"
            })
            console.log(error)
            console.log(error.response.data)
        })


    }

    // var order = props.route.params ? props.route.params.order : null;
    // console.log("Confirm");
    // console.log(props.route.params)
    return (
        <>
            {props.route.params ?
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            Confirm Order
                        </Text>

                        <View style={{ borderWidth: 1, borderColor: 'orange' }}>
                            <Text style={styles.title}>Shipping to: </Text>
                            <View style={{ padding: 8 }}>
                                <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
                                <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
                                <Text>City: {finalOrder.order.order.city}</Text>
                                <Text>Zip Code: {finalOrder.order.order.zip}</Text>
                                <Text>Country: {finalOrder.order.order.country}</Text>
                            </View>
                            <Text style={styles.title}>Items:</Text>
                            {props.cartItems.map((x) => {
                                return (
                                    <ListItem
                                        style={styles.listItem}
                                        key={x.product.name}
                                        avatar
                                    >
                                        <Left>
                                            <Thumbnail source={{ uri: x.product.image }} />
                                        </Left>
                                        <Body style={styles.body}>
                                            <Left>
                                                <Text>{x.product.name}</Text>
                                            </Left>
                                            <Right>
                                                <Text>$ {x.product.price} </Text>
                                            </Right>

                                        </Body>

                                    </ListItem>
                                )
                            })}

                        </View>
                        <View style={{ alignItems: 'center', margin: 20 }}>
                            <Button title={'Place order'} onPress={confirmOrder} />
                        </View>
                    </View>
                </ScrollView>
                :
                <View>
                    <Text style={{alignItems:'center', justifyContent: 'center'}}>
                        Please Complete Shiping and Payment process 
                    </Text>
                </View>
            }
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart)
    }
}
const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    title: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: width / 1.2
    },
    body: {
        margin: 5,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);