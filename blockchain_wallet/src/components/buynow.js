import React, {Component} from 'react';
import  {View, Text} from 'react-native';
import Header from '../components/general/header';


class BuyNow extends Component {
    componentWillMount ()
    {
        console.log('componentWillMount in BuyNow');
    }
    render () {
        return (

            <View>
            <Header headerText ={'Buy Now Details'} />
        </View>
        )
        
    }
}

export default BuyNow;