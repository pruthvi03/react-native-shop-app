import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions, ScrollView } from 'react-native';
import { Container, Header, Icon, Item, Input, Text } from 'native-base';
import { useFocusEffect } from '@react-navigation/native'

import ProductList from './ProductList';
import SearchedProduct from './SearchProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import axios from 'axios';

import baseUrl from '../../assets/common/baseUrl';

var { height, width } = Dimensions.get('window')

const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductCtg] = useState([]);
    const [active, setActive] = useState();
    const [intialState, setIntialState] = useState();
    const [loading, setLoading] = useState(true);

    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);

                axios.get(`${baseUrl}product`)
                    .then((res) => {
                        setProducts(res.data.message);
                        setProductsFiltered(res.data.message);
                        setProductCtg(res.data.message)
                        setIntialState(res.data.message);
                        setLoading(false)
                        // console.log(res)
                    })
                    .catch((err) => console.log(err.message))

                axios.get(`${baseUrl}category`)
                    .then((res) => {
                        setCategories(res.data.message);
                        // console.log(res)
                    })
                    .catch((err) => console.log(err.message))

                return () => {
                    setProducts([]);
                    setProductsFiltered([]);
                    setFocus()
                    setCategories([]);
                    setActive();
                    setIntialState();
                }
            },
            [],
        )
    )
    )



    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const openList = () => {
        setFocus(true)
    }

    const onBlur = () => {
        setFocus(false)
    }

    // Categories
    const changeCtg = (ctg) => {
        {
            ctg === 'all'
                ? [setProductCtg(intialState), setActive(true)]
                : [
                    setProductCtg(
                        products.filter((product) => product.category._id === ctg),
                    ),
                    setActive(true)
                ];
        }
    }

    return (
        <>
        {loading === false?(

        
        <Container>
            <Header searchBar rounded transparent>
                <Item>
                    <Icon name="ios-search" style={{ "color": "#FF9292" }} />
                    <Input
                        placeholder="Search"
                        onFocus={openList}
                        onChangeText={(text) => searchProduct(text)}
                    />
                    {focus == true ? (
                        <Icon onPress={onBlur} name="ios-close" />
                    ) : null}
                </Item>
            </Header>
            {focus == true ? (
                <SearchedProduct
                    productsFiltered={productsFiltered}
                    navigation={props.navigation}
                />
            ) : (
                <ScrollView
                    contentContainerStyle={{ paddingBottom: width / 2 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        <View>
                            <Banner />
                        </View>
                        <View>
                            <CategoryFilter
                                categories={categories}
                                categoryFilter={changeCtg}
                                productsCtg={productsCtg}
                                active={active}
                                setActive={setActive}
                            />
                        </View>
                        {productsCtg.length > 0 ? (
                            <View style={styles.listContainer}>
                                {productsCtg.map((item) => {
                                    return (
                                        <ProductList
                                            navigation={props.navigation}
                                            key={item._id}
                                            item={item}
                                        />
                                    )
                                })}
                            </View>

                        ) : (
                            <View style={[styles.center, { height: height / 2 }]}>
                                <Text>No products found</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </Container>
        ):(
            // Loading
            <Container style={[styles.center, {backgroundColor: '#f2f2f2'}]}>
                <ActivityIndicator size='large' color='#FF9292' />
            </Container>    
        )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        // backgroundColor: "gainsboro"
    },
    listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        // backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default ProductContainer;