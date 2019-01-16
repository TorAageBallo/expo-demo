import React from 'react';
import {View, Platform} from 'react-native';
import {MapView, Constants, Location, Permissions} from 'expo';

export default class App extends React.Component {

  state = {
    errorMessage: null,
    mapRegion: null,
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    await Location.watchPositionAsync({}, location =>
        this.setState({
          mapRegion: {
            latitude: location.coords.latitude, longitude: location.coords.longitude,
            latitudeDelta: 0.0922 / 5, longitudeDelta: 0.0421 / 5
          }
        })
    )
  };

  render() {
    return (
        <View style={{flex: 1}}>
          <MapView
              style={{flex: 1}}
              zoomEnabled={true}
              showsUserLocation={true}
              region={this.state.mapRegion}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
          />
        </View>
    );
  }
}
