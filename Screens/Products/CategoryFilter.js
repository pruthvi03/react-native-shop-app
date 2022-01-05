import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { ListItem, Badge, Text } from 'native-base';

const CategoryFilter = (props) => {
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ backgroundColor: "#fff" }}
        >
            <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.categoryFilter('all'),
                            props.setActive(-1)
                    }}
                >
                    <Badge style={[styles.center, { margin: 5 },
                    props.active == -1 ? styles.active : styles.inactive
                    ]}
                    >
                        <Text style={{ color: 'white' }}>All</Text>
                    </Badge>
                </TouchableOpacity>
                {props.categories.map((item) => (
                    <TouchableOpacity
                        key={item._id}
                        onPress={() => {
                            props.categoryFilter(item._id),
                                props.setActive(props.categories.indexOf(item))
                        }}
                    >
                        <Badge style={[styles.center, { margin: 5 },
                        props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                        ]}
                        >
                            <Text style={{ color: 'white' }}>{item.name}</Text>
                        </Badge>
                    </TouchableOpacity>
                ))}
            </ListItem>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    active: {
        backgroundColor: '#FF9292'
    },
    inactive: {
        backgroundColor: '#FFB4B4'
    }
})

export default CategoryFilter;