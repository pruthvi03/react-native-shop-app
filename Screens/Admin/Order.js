import React, {useState, useCallback} from 'react';
import {View, FlatList, Text} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import baseURL from '../../assets/common/baseUrl';
import OrderCard from '../../Shared/OrderCard';

const Orders = (props)=>{
    
    const [orderList, setOrderList] = useState();

    useFocusEffect(
        useCallback(
            () => {
                getOrders();
                return ()=>{
                    setOrderList();
                }
            },
            [],
        )
    );

    const getOrders = ()=>{
        axios
        .get(`${baseURL}orders`)
        .then((x)=>{
            setOrderList(x.data.message)
        })
        .catch((error)=>{
            console.log(error)
            console.log(error.response.data)
        })
    }
    
    return (
        <View>
            <FlatList
                data = {orderList}
                renderItem = { ({item}) => (
                    <OrderCard navigation={props.navigation} {...item} editMode={true}/>
                )}
                keyExtractor={(item)=>item.id}
                style={{marginBottom:50}}
            />
        </View>
    )
}

export default Orders;