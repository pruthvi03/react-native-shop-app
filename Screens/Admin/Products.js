import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions
} from 'react-native';

import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseUrl from '../../assets/common/baseUrl';
import ListItem from './ListItem';
import Easybutton from '../../Shared/StyledComponents/EasyButton';

var { height, width } = Dimensions.get('window');

const ListHeader = () => {
    return (
        <View elevation={1} style={styles.listHeader}>
            <View style={styles.headerItem}></View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: 'bold' }}>Brand</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: 'bold' }}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: 'bold' }}>Category</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: 'bold' }}>Price</Text>
            </View>
        </View>
    );
}

const Products = (props) => {

    const [productList, setProductList] = useState();
    const [productFilter, setproductFilter] = useState();
    const [loading, setloading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(
            () => {
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => {
                        console.log('error: ', error)
                    })

                axios.get(`${baseUrl}product`)
                    .then((res) => {
                        setProductList(res.data.message);
                        setproductFilter(res.data.message);
                        setloading(false);
                    })

                return () => {
                    setProductList();
                    setproductFilter();
                    setloading(true);
                }
            },
            [],
        )
    )

    const searchProduct = (text) => {
        if (text == '') {
            setproductFilter(productList);
        }
        setproductFilter(
            productList.filter(item => {
                return item.name.toLowerCase().includes(text.toLowerCase());
            })
        )
    }

    const deleteProduct = (id) => {
        axios.delete(`${baseUrl}product/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data.message);
                setProductList(productFilter.filter(item => item._id !== id))
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Easybutton
                    secondary medium 
                    onPress={()=>props.navigation.navigate("Orders")}
                >
                    <Icon name="shopping-bag" size={18} color="white" />
                    <Text style={styles.buttonText}>Orders</Text>
                </Easybutton>
                <Easybutton
                    secondary medium 
                    onPress={()=>props.navigation.navigate("ProductForm")}
                >
                    <Icon name="plus" size={18} color="white" />
                    <Text style={styles.buttonText}>Products</Text>
                </Easybutton>
                <Easybutton
                    secondary medium 
                    onPress={()=>props.navigation.navigate("Categories")}
                >
                    <Icon name="plus" size={18} color="white" />
                    <Text style={styles.buttonText}>Categories</Text>
                </Easybutton>
            </View>
            <View>
                <Header searchBar rounded style={{ backgroundColor: '#fff', borderBottomWidth: 0 }}>
                    <Item>
                        <Icon name="search" style={{ color: '#000' }} />
                        <Input placeholder="Search"
                            onChangeText={(text) => searchProduct(text)}
                        />
                    </Item>
                </Header>
            </View>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <FlatList
                    data={productFilter}
                    ListHeaderComponent={ListHeader}
                    renderItem={({ item, index }) => (
                        <ListItem
                            {...item}
                            navigation={props.navigation}
                            index={index}
                            delete = {deleteProduct}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#fff',
    },
    headerItem: {
        margin: 3,
        width: width / 6,
    },
    container:{
        marginBottom:160,
        backgroundColor:'#fff'
    },
    buttonContainer:{
        margin:20,
        alignSelf:'center',
        flexDirection:'row'
    },
    buttonText:{
        marginLeft:4,
        color:'#fff'
    }
})

export default Products;