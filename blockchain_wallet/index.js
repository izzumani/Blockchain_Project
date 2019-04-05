//import a libary to help create a component
import React from 'react';
import {View,AppRegistry} from 'react-native';
import BodyDetails from './src/components/general/bodydetails'
//create a component


const App = () =>{      
    return (
        <View>
                <BodyDetails  />
        </View>
        
    )
};
//Render it to the device

AppRegistry.registerComponent('blockchain_wallet', ()=> App);
