import React, { Component } from 'react';
import {MapView} from 'expo';

export class Map extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MapView
        {this.props.handlePress}
        style={{ flex: 1 , width :300 ,height : 400 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    )
  }
}