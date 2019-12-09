// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

class SearchScreen extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });

    let endpoint = "https://enigmatic-spire-53426.herokuapp.com/api/v1/butterflies.json";
    console.log("Word: ", search.toLowerCase())
    axios.get(endpoint, {
      params: {
        butterfly_name: search.toLowerCase()
      }
    })
    .then(result => {
      //this.setState({result:result.data});
      console.log(result.data);
    });
    
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
};

export default SearchScreen;