import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./screens/HomeScreen";
import ISSLocation from "./screens/IssLocation";
import MeteorScreen from "./screens/MeteorScreen";
import UpdateScreen from "./screens/UpdatesScreen";
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
const Stack = createStackNavigator()

export default class App extends React.Component {
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown : false}} initialRouteName="Home">
        <Stack.Screen name = "Home" component = {HomeScreen}/>
        <Stack.Screen name = "ISSLocation" component = {ISSLocation}/>
        <Stack.Screen name = "Meteor" component = {MeteorScreen}/>
        <Stack.Screen name = "Updates" component = {UpdateScreen}/>
      </Stack.Navigator>
    </NavigationContainer>    
  );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
