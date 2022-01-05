import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import { H1, Thumbnail, Left, Right, Container, ListItem, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { SwipeListView } from 'react-native-swipe-list-view';

const { width, height } = Dimensions.get('window')
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

const Cart = (props) => {

    var totalPrice = 0;
    props.cartItems.forEach(cart => {
        return ( totalPrice += cart.product.price)
    })
    return (
        <>
            {props.cartItems.length ? (
                <Container>
                    <Text style={{ alignSelf: 'center' }}>Cart</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        bounces
                        style={{ paddingBottom: 100 }}
                    >
                        {props.cartItems.map(data => {
                            return (
                                <ListItem
                                    style={styles.listItem}
                                    key={Math.random()}
                                    avatar
                                >
                                    <Left>
                                        <Thumbnail source={{ uri: data.product.image ? data.product.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }} />
                                    </Left>
                                    <Body style={styles.listBody}>
                                        <Left>
                                            <Text>{data.product.name}</Text>
                                        </Left>
                                        <Right>
                                            <Text>$ {data.product.price}</Text>
                                            <TouchableOpacity onPress={() => { props.removeFromCart(data) }}>
                                                <Icon name="trash" size={25} color={'#FF9292'} />
                                            </TouchableOpacity>
                                        </Right>
                                    </Body>
                                </ListItem>
                            )
                        })}

                    </ScrollView>
                    <View style={styles.bottomView}>
                        <Left>
                            <Text style={styles.price}>$ {totalPrice}</Text>
                        </Left>
                        <TouchableHighlight
                                onPress={() => props.clearCart()}
                            >
                                <Text style={styles.bottomButtons}>Clear List
                                </Text>
                            </TouchableHighlight>
                        <Right>
                            
                        
                            <TouchableHighlight
                                onPress={() => props.navigation.navigate('CheckOut')}
                            >
                                <Text style={styles.bottomButtons}>Checkout
                                </Text>
                            </TouchableHighlight>
                        </Right>
                    </View>
                </Container>

            ) : (
                <Container style={styles.emptyContainer}>
                    <Text>Looks like your cart is empty</Text>
                    <Text>Add products to your to get started</Text>
                </Container>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin:10,
        padding:5,
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    listBody: {
        alignItems: 'center',
        margin: 10,
        flexDirection: 'row',
    },
    bottomView: {
        marginBottom: 50,
        flexDirection: 'row',
        padding: 10,
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: '#FF9292'
    },
    bottomButtons: {
        fontSize: 15,
        margin: 10,
        padding: 5,
        backgroundColor: '#FF9292',
        color: '#fff',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,

        elevation: 5,
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);