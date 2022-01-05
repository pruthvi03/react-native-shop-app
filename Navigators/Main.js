import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Stack
import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import CartIcon from '../Shared/CartIcon';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
import AuthGlobal from '../Context/store/AuthGlobal';

const Tab = createBottomTabNavigator();

const Main = () => {

  const context = useContext(AuthGlobal)

  return (
    <Tab.Navigator
      initialRouteName="Home"
      style={styles.bottomTab}
      screenOptions={{
        tabBarVisible: false,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.bottomTab,
        tabBarActiveTintColor: '#FF9292'
      }}
      configureScene={(route) => {
        return Navigator.SceneConfigs.PushFromRight;
      }}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={20} />
          )
        }}
      />
      <Tab.Screen
        name="CartNavigator"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="shopping-cart" color={color} size={20} />
              <CartIcon />
            </View>
          )
        }}
      />

      {context.stateUser.user.isAdmin === true ? (
        <Tab.Screen
          name="AdminNavigator"
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={20} />
            ),
          }}
        />
      ) : null}

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomTab: {
    position: 'absolute',
    // bottom: 20,
    // left: 20,
    // right: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    // height: 90  
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80
  }

});
export default Main;