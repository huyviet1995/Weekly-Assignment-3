import {Marker} from 'react-native-maps';
import React, { Component } from 'react';
import {MapView} from 'expo';
import { Platform, Text, View, StyleSheet } from 'react-native';

export class Map extends React.Component {

  constructor() {
    super();
    this.state = {
      locations: [], 
    }
  }
  // Debugging
  handlePress = (e) => {
    data = e.nativeEvent;
    let locations = this.state.locations;
    locations.push(data.coordinate);
    this.setState({
      locations: locations, 
    });
    console.log("The data is fetched correctly!");
    console.log(this.state.locations);
  }

  render() {
    return (
      <MapView
        onLongPress = {this.handlePress}
        style={{ flex: 1 , width :300 ,height : 400 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {this.state.locations.map((location,index) => {
          console.log("Here is the data after being fetched!");
          console.log(location,index);
          return (
            <Marker coordinate = {location}></Marker>
          )
        })}
      </MapView>
    )
  }
}