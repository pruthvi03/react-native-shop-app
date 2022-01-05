import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { Left, Right, Container, H1 } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

import * as actions from '../../Redux/Actions/cartActions';
import { connect } from 'react-redux';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';

const { width } = Dimensions.get('window')


const SingleProduct = (props) => {
    const [item, setItem] = useState(props.route.params.item)
    const [availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState('');

    useEffect(() => {
        if (props.route.params.item.countInStock === 0) {
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText('Out of Stock');
        } else if (props.route.params.item.countInStock <= 5) {
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText('Limited Stock');
        } else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText('In Stock');
        }

        return () => {
            setAvailability(null);
            setAvailabilityText('');
        }
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={props.navigation.goBack}>
                    <Icon name="arrow-left" size={20} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: 'bold' }}>
                    {item.name}
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 280
                }}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: item.image ? item.image
                                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode="contain"

                    />
                </View>
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{marginRight:10}}>
                            {availabilityText}
                        </Text>
                        {availability}
                    </View>
                </View>

                <View style={styles.details}>

                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff' }}>
                        Price: ${item.price}
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>

                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff' }}>
                            {item.name}
                        </Text>


                        <View style={styles.iconContainer}>
                            <Icon name="heart" color={'#000'} size={15} />
                        </View>

                    </View>

                    <Text style={styles.detailsText}>
                        {item.description}
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived not
                        only five centuries.
                    </Text>

                </View>
                <View style={{ marginTop: -50, marginBottom: 200, margin: 20 }}>
                    <TouchableOpacity
                        style={styles.cartButton}
                        onPress={() => {
                            props.addItemToCart(item)
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: `${item.name} added to Cart`,
                                text2: "Go to your cart to complete order"
                            })
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Add to Cart </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => {
            dispatch(actions.addToCart({ quantity: 1, product }))
        }
    }
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    details: {
        margin: 10,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 60,
        // marginBottom: 50,
        backgroundColor: '#FF9292',
        // borderTopRightRadius: 40,
        // borderTopLeftRadius: 40,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,

        elevation: 5,
    },
    image: {
        width: width / 2,
        height: width / 2,
        backgroundColor: 'transparent',
        position: 'absolute'
    },
    iconContainer: {
        backgroundColor: '#fff',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,

        elevation: 5,
    },
    detailsText: {
        marginTop: 10,
        lineHeight: 22,
        fontSize: 16,
        color: '#fff',
    },
    cartButton: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        textAlign: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,

        elevation: 5,
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    availability:{
        flexDirection: 'row',
        marginBottom: 10
    }
})
export default connect(null, mapDispatchToProps)(SingleProduct);