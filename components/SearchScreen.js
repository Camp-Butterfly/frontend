// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'flex-end',
  },
  scrollView: {
    //backgroundColor: 'pink',
  },
  title: {
    //textAlign: 'center', // <-- the magic
    fontFamily: 'Futura',
    padding: 17,
    fontSize: 28,
    fontWeight: "bold",
    color: '#474747',
    backgroundColor: "#ffeecf"
  },
  image: {
    width: '100%',
    height: 300
  },
  caption: {
    fontFamily: 'Futura',
    //flex: 0,
    //backgroundColor: '#fff',
    //borderRadius: 5,
    padding: 17,
    //paddingHorizontal: 20,
    //alignSelf: 'center',
    //margin: 20,
    paddingBottom:70
  },
  description: {
    paddingTop: 17,
    paddingLeft: 17,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fcb83d',
  }
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
        case 'milkweed':
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
      <View styles={styles.container}>
        <SearchBar
          inputContainerStyle={{backgroundColor: 'white'}}
          // inputStyle={{backgroundColor: 'white'}}
          // containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
          placeholder="Search"
          onChangeText={this.updateSearch}
          value={search}
        />
        {this.state.name.length > 0 ? (
          <ScrollView style={styles.scrollView}>
          <Image style={styles.image} source={this.state.picture}/>
          <Text style={styles.title}>{this.state.name}</Text>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.caption}>{this.state.description}</Text>
          </ScrollView>
        ) : null }
        
      </View>
    );
  }
};

export default SearchScreen;