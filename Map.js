import React, { Component } from 'react';
import {MapView, ImagePicker} from 'expo';
import {Image, Button, Platform, Text, View, StyleSheet } from 'react-native';

export class Map extends React.Component {

  constructor() {
    super(); 
    this.state = {
      locations: [], 
      images: [],
    }
    this._pickImage = this._pickImage.bind(this);
  }
  // Debugging
  handlePress = (e) => {
    data = e.nativeEvent;
    let locations = this.state.locations;
    locations.push(data.coordinate);
    this.setState({
      locations: locations, 
    });
  }

  onPressMarker = (e) => {
    console.log("This should be pressed correctly!");
  }

  _pickImage = async (calloutKey) => {
    console.log(this.state.images[calloutKey]);
    if (this.state.images[calloutKey] == null) {
      console.log("Pick an image");
      let result = await Expo.ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
      if (!result.cancelled) {
        let images = this.state.images;
        images.push(result);
        this.setState({
          images: images,
        });
      }
    }
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
        {this.state.locations.map((location, calloutKey) => {
          return (
            <MapView.Marker 
              key = {calloutKey}
              coordinate = {{
                longitude: location.longitude,
                latitude: location.latitude,
              }}>
              <MapView.Callout key = {calloutKey} onPress = {() => this._pickImage(calloutKey)}>
              <View style={{width: 100, height: 100}}>
              {this.state.images[calloutKey] != null ?
               (<Image source = {{isStatic: true, uri: this.state.images[calloutKey].uri}} >
               </Image>) : (null) }
                <Text>{"Marker " + calloutKey}</Text>
              </View>
              </MapView.Callout>
            </MapView.Marker>
          )
        })}
      </MapView>
    )
  }
}