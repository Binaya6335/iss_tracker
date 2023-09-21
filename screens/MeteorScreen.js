import React from "react";
import { StyleSheet, Text, View, Image, FlatList, Platform, StatusBar, SafeAreaView } from 'react-native';
import axios from "axios";

export default class MeteorScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            meteors : {}
        }
    }

    componentDidMount(){
        this.getMeteors();
    }

    getMeteors = () => {
        axios
         .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=TuEsAnOdnsZ2Aeh7unQ5wWXC7EtMP4FnQ6EFjh5L")        
         .then((response) => {
            this.setState({ meteors : response.data.near_earth_objects })
            console.log(Object.keys(this.state.meteors))
         })
         .catch((error) => {
            Alert.alert(error.message)
         })
    }

    keyExtractor = (item, index) => {
        index.toString();
    }

    renderItem = ({item}) => {
        let meteor = item;
        let bg_img, speed, size;
        if (meteor.threat_score <=30) {
            bg_img = require("../assets/meteor_bg1.png")
            speed = require("../assets/meteor_speed3.gif") 
            size=100           
        } else if (meteor.threat_score <=75) {
            bg_img = require("../assets/meteor_bg2.png")
            speed = require("../assets/meteor_speed3.gif") 
            size=150              
        } else {
            bg_img = require("../assets/meteor_bg3.png")
            speed = require("../assets/meteor_speed3.gif") 
            size=200
        }
        return (
            <View style={{
                flex:1,
                justifyContent:"center",
                alignItems:"center"
            }}>       
            <Image source = {bg_img}/>         
            </View>
        )
    }


    render(){
           if (Object.keys(this.state.meteors).length===0) {
            return(
                <View>
                    <Text>Loading</Text>
                </View>
            )            
           } else {
           var meteor_array = Object.keys(this,state.meteors).map(meteor_date=>{
            return this.state.meteors[meteor_date]
           })
           var meteors = [].concat.apply([], meteor_array);             

           meteors.forEach(function (element) {
            var diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max)/2
            var threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers) * 1000000000
            element.threat_score = threatScore;
           });

           meteors.sort(function(a,b){
             return b.threat_score - a.threat_score
           })

           meteors = meteors.splice(0, 5)

           return(
            <View style = {{
                flex:1,
                justifyContent : "center",
                alignItems : "center"
            }}>

            <SafeAreaView style = {styles.droidSafeArea} />
             
             <FlatList
                keyExtractor={this.keyExtractor}
                data={meteors}
                renderItem={this.renderItem}
                horizontal={true}
             />
             
             </View>
             ) 
           }           
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