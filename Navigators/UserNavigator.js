import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import UserProfile from '../Screens/User/UserProfile';


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Register'
                component={Register}
                options={{
                    title: 'Register',
                }}
            />
            <Stack.Screen
                name='UserProfile'
                component={UserProfile}
                options={{
                    title: 'UserProfile',
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack/>
}