import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Platform, ImageBackground, Image} from 'react-native';

export default class HomeScreen extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
              <SafeAreaView style = {styles.drawidsafearea}/>
              <ImageBackground source = {require('../assets/bg_image.png')} style = {styles.backgroundImage} resizeMode="cover">
                <View style = {styles.titlebar}>
                  <Text style = {styles.titletext}> ISS Tracker App </Text>
                </View>
                <TouchableOpacity style = {styles.routeCard} onPress = {()=>{this.props.navigation.navigate("ISSLocation")}}>
                    <Text style = {styles.routeText}>ISS Location</Text>
                    <Text style = {styles.knowmoretext}>{"Know More --->"}</Text>
                    <Text>1</Text>  
                    <Image source = {require ("../assets/iss_icon.png")} style = {styles.iconimg}></Image>              
                </TouchableOpacity>
                <TouchableOpacity style = {styles.routeCard} onPress = {()=>{this.props.navigation.navigate("Meteor")}} >
                    <Text style = {styles.routeText}>Meteor</Text>
                    <Text style = {styles.knowmoretext}>{"Know More --->"}</Text>
                    <Text>2</Text>
                    <Image source = {require ("../assets/meteor_icon.png")} style = {styles.iconimg}></Image>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.routeCard} onPress = {()=>{this.props.navigation.navigate("Updates")}}>
                    <Text style = {styles.routeText}>Updates</Text>
                    <Text style = {styles.knowmoretext}>{"Know More --->"}</Text>
                    <Text>3</Text>
                    <Image source = {require ("../assets/rocket_icon.png")} style = {styles.iconimg}></Image>
                </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    };
};


const styles = StyleSheet.create({
      container: {
        flex: 1,
      },

      knowmoretext : {
        paddingLeft : 30,
        color : "red",
        fontSize : 15,
      },

      drawidsafearea: {
        marginTop : Platform.OS === "android"? StatusBar.currentHeight : 0,
      },

      titlebar: {
        flex: 0.15,
        justifyContent : "center",
        alignItems : "center",
      },

      titletext: {
        fontSize: 40,
        fontWeight : "bold",
        color : "white",
      }, 

      routeCard: {
        flex: 0.35,
        marginTop : 50,
        marginLeft : 50,
        marginRight : 50,
        borderRadius : 30,
        backgroundColor : "white",
      },

      routeText: {
        fontSize: 35,
        fontWeight : "bold",
        color: "black",
        marginTop : 75,
        paddingLeft : 30,
      },

      backgroundImage: {
        flex : 1,
        resizeMode : "cover",
      },

      iconimg : {
        position : "absolute",
        height : 200,
        width : 200,
        resizeMode : "contain",
        right : 60,
        top : -50,
      },
})