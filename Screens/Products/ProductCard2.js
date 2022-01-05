import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';
import Toast from "react-native-toast-message";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
var { width } = Dimensions.get('window')

const ProductCard = (props) => {
    const { name, price, image, countInStock } = props;
    return (
        <View style={styles.card}>
            <Image 
                  style={styles.image}
                  resizeMode="contain"
                  source={{uri: image ? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
              />
          <View style={styles.details}>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}>{name}</Text>
            <Text style={{fontSize: 10, color: 'darkgrey', marginTop: 2}}>
              {name}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              ${price}
            </Text>
            <TouchableOpacity 
            onPress={() => {
              props.addItemToCart(props)
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: `${name} added to Cart`,
                text2: "Go to your cart to complete order"
            })
            }}
            >
              <Icon name="shopping-cart" size={25} color={'#000'} style={{marginLeft:10}}/>
            </TouchableOpacity>
          </View>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
  return{
    addItemToCart: (product) => {
      dispatch(actions.addToCart({quantity:1, product}))
    }
  }
}

const styles = StyleSheet.create({
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    details:{
        marginTop:100,
        alignItems:'center'
    },
    card: {
        height: width / 2 + 20,
        width: width / 2 - 20,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
        padding:5,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: '#fff',
        alignItems:'center'
      }
})

export default connect(null, mapDispatchToProps)(ProductCard);