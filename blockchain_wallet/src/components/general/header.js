import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Header = (props)=> {
    return (
        <View style={headerContainer}>
            <Text style={header}>{props.headerText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer :{
        backgroundColor: '#F8F8F8',
        display: "flex",
        paddingTop:15,
        alignItems:"center",
        justifyContent:'center',
        height:40,
        shadowColor:'#000',
        shadowOffset:{width:0,height:20},
        shadowOpacity: 0.5,
        elevation:2,
        position:'relative'

    },
    header:{
        fontWeight:"bold",
        fontSize:20,
    }
});

const {headerContainer,header} = styles;
export default Header;