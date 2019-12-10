// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1
   // justifyContent:'flex-end',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginBottom: 67
  },
  title: {
    //textAlign: 'center', // <-- the magic
    padding: 20,
    fontSize: 40,
    fontWeight: "bold"
  },
  image: {
    flex: 0
  },
  caption: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

class SearchScreen extends React.Component {
  state = {
    search: '',
    name: '',
    picture: '',
    description: '',
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
      let butterfly_name = result.data.butterfly_name;
      // Convert first letter to uppercase
      butterfly_name = butterfly_name.substring(0, 1).toUpperCase() + butterfly_name.substring(1);
      this.setState({ name: butterfly_name });
      this.setState({ description: result.data.description });
      switch(result.data.butterfly_name){
        case 'monarch':
          this.setState({ picture: require('../images/Monarch.jpeg') })
          break;
        case 'sulphur':
          this.setState({ picture: require('../images/Sulphur.jpeg') })
          break;
        case 'cabbage':
          this.setState({ picture: require('../images/Cabbage.jpeg') })
          break;
        case 'ringlet':
          this.setState({ picture: require('../images/Ringlet.jpeg') })
          break;
        default:
          this.setState({ picture: '' })
          break;
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  render() {
    const { search } = this.state;

    return (
      <View styles={styles.image}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <ScrollView style={styles.scrollView}>
          <Image style={styles.image} source={this.state.picture}/>
          <Text style={styles.title}>{this.state.name}</Text>
          <Text style={styles.caption}>{this.state.description}</Text>
        </ScrollView>
      </View>
    );
  }
};

export default SearchScreen;