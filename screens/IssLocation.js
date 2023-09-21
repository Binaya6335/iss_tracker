import React from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, StatusBar, Platform , Image} from 'react-native';
import MapView,{Marker} from "react-native-maps";
import axios from "axios";
import {LogBox} from "react-native";
LogBox.ignoreAllLogs();

export default class ISSLocation extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            location: {},
            isRefesh: false,
        };
    }

    getISSLocation =()=>{
        axios
            .get("https://api.wheretheiss.at/v1/satellites/25544")
            .then((response)=>{
                this.setState({location: response.data})
            })
            .catch((error)=>{
                Alert.alert(error.message)
            })
    }

    componentDidMount(){
        this.getISSLocation();
    }

    render(){
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.droidSafeArea}/> 
                <ImageBackground style = {styles.backgroundImage} source = {require("../assets/iss_bg.jpg")}>
                    <View style = {styles.titleContainer}>
                        <Text style = {styles.titleText}>ISS Location</Text>
                    </View>
                    <View style = {styles.mapContainer}>
                        <MapView style = {styles.map}
                         region={{
                            latitude: this.state.location.latitude,
                            longitude: this.state.location.longitude,
                            latitudeDelta: 100,
                            longitudeDelta: 100
                        }}>
                            <Marker
                                coordinate = {{latitude: this.state.location.latitude, longitude: this.state.location.longitude}}>
                                <Image source ={require("../assets/iss_icon.png")} style = {{width:50, height:50}}/>
                            </Marker>
                        </MapView>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    knowmoretext : {
      paddingLeft : 30,
      color : "red",
      fontSize : 15,
    },

    droidSafeArea : {
      marginTop : Platform.OS === "android"? StatusBar.currentHeight : 0,
    },

    titleContainer: {
      flex: 0.15,
      justifyContent : "center",
      alignItems : "center",
    },

    titleText: {
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

    mapContainer : {
        flex: 0.6,
    },

    map : {
        width: "100%",
        height: "100%"
    },
})