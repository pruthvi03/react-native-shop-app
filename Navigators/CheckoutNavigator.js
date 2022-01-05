import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Checkout from '../Screens/Cart/Checkout/Checkout';
import Payment from '../Screens/Cart/Checkout/Payment';
import Confirm from '../Screens/Cart/Checkout/Confirm';



const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: styles.topTab,
            tabBarActiveTintColor: '#FF9292',
            tabBarIndicatorStyle:{
                backgroundColor:"#FF9292",
                // borderRadius:10,
                width:0,
                // borderBottomWidth:0,
            },
            // tabBarIndicator:false
            tabBarLabelStyle:{
                fontSize:15,
                fontWeight:'bold'
            }
          }}
        >
            <Tab.Screen name="Shipping" component={Checkout}/>
            <Tab.Screen name="Payment" component={Payment}/>
            <Tab.Screen name="Confirm" component={Confirm}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    topTab:{
        borderRadius:15,
        margin:5
    }
})
export default function CheckoutNavigator(){
    return <MyTabs/>
}