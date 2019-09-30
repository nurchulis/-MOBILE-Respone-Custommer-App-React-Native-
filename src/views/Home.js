/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions,ScrollView, StatusBar,FlatList, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import Image from 'react-native-scalable-image'
import api from '../api'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../components/Button'
import Data from '../module/data'
import homea from '../static/wall.png'

var {height, width} = Dimensions.get('window')

export default class Home extends Component {

  //config header pencarian
  static navigationOptions = {
      headerTitle: "Beranda",
      headerTintColor: 'white',
      headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
          fontSize:16
        },
        headerStyle: {
          elevation: 1,
          backgroundColor: '#04a3e7',
          height: 50,
          textAlign: 'center'

      },
    }

    constructor(props) {
      super(props)
      //this._showCounter.bind(this)
      this.state = {
        username:[],
        email:[],
        avatar:[],
        isLoading:false,
        error:false
      }
  }

  async componentDidMount () {
    let name =  await Data.getName()
    let email = await Data.getEmail()
    let avatar = await Data.getAvatar()
    this.setState({username: name, email: email, avatar: avatar})
  }
   

  _ScanBarcode = () => {
 
    this.props.navigation.navigate('AddRespone')
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="#1abc9c" barStyle="light-content"/>
          <View style={{width:width-64,padding:24, marginBottom:30, alignItems:'center', height:184, elevation:2,marginTop:16, borderRadius:12,backgroundColor:'#1abc9c'}}>
          <Image
               style={{marginVertical:0}}
                 width={width-100} // height will be calculated automatically
                 source={homea}
              />
          <Text style={{color:'white',textAlign:'center', fontWeight:'bold', marginTop:10}}>This is simple App, QRscanner For read data and show with Get API</Text>
          </View>

          <Button Icon={<Icon name="camera" size={10} color="white"/>} title="Tambah Respone" textStyle={{color:'white'}} style={{backgroundColor:'#1abc9c'}} onPress={ this._ScanBarcode }/>

          
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      paddingVertical:8,
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
    }
  }
)