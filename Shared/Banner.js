import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Button,
    ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper/src';

var { width } = Dimensions.get('window');

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData([
            "https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg",
            "https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg",
            "https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg",
        ]);
        return () => {
            setBannerData([]);
        }
    }, [])
    return (
        <ScrollView>

            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper
                        style={{ height: width / 2 }}
                        showButton
                        autpPlay
                        autpPlayTimeout={2}
                        key={bannerData.length}
                        loop={true}
                        dotColor="#000" activeDotColor="#FF9292"
                    >
                        {bannerData.map((item) => {
                            return (
                                <Image
                                    key={item}
                                    style={styles.imageBanner}
                                    resizeMode="contain"
                                    source={{ uri: item }}
                                />
                            )
                        }
                        )}
                    </Swiper>
                    <View style={{ height: 20 }}></View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F5FCFF',
    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 10
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    }
})

export default Banner;