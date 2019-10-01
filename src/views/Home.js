/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions,  ImageBackground,ScrollView, StatusBar,FlatList, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import Image from 'react-native-scalable-image'
import api from '../api'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Data from '../module/data'
import homea from '../static/wall.png'

var {height, width} = Dimensions.get('window')
const DeviceWidth = Dimensions.get('window').width
export default class Home extends Component {

  //config header pencarian
  static navigationOptions = ({ navigation }) => ( {
      headerTitle: "Beranda",
      headerTitleStyle: {
          fontWeight: 'bold',
          color: 'red',
          fontSize:16
        },
        headerStyle: {
          elevation: 1,
          color:'red',
          backgroundColor: 'blue',
          height: 50,
          textAlign: 'center'

      },
    })

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
        
<StatusBar backgroundColor="#3498db"  barStyle = "light-content" />
        <View style={styles.box1}>
        <ImageBackground source={require('../static/mendung.png')} style={{width: '100%', height: '100%'}}>
        <View style={{width: '100%', flexDirection: 'row',alignItems: 'center'}}>
     <Text style={{width: '100%',textAlign: 'center', color:'white', fontWeight:'bold', marginTop:20}} >Cuaca Cerah</Text>
</View>
  </ImageBackground>
        </View>
        <View style={styles.box2}>
          <View style={{backgroundColor:'white', borderRadius:5, width:'80%', height:120,
          shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
          }}>
        <View style={{paddingLeft:10,paddingBottom:5, paddingTop:5, backgroundColor:'#3498db'}}>
        <Text style={{fontWeight:'bold',color:'white', fontSize:20}}>Jumlah Respone : 30</Text></View>
        <View style={{flexDirection:"row", width:'100%', padding:10, alignItems:'center', alignContent:'center', flex:1, alignSelf:'center'}}>
        <View style={{width:DeviceWidth/3, alignItems: 'center', marginLeft:10, marginRight:20}}>
        <Button buttonStyle={{backgroundColor:'#ff7979', borderRadius:5, height:60}} icon={<Icon
      name="plus-square"
      size={25}
      color="white"
    /> }title=" Tambah Respone"/>

        </View>

        <View style={{width:DeviceWidth/3}}>
        <Button  buttonStyle={{backgroundColor:'#2ecc71', height:60}} 
  icon={
    <Icon
      name="eye"
      size={25}
      color="white"
    />
  }
  title=" Lihat Respone"
/>
        </View>
        
        </View>

        </View>
        </View>
        
        <View style={{marginTop:200, backgroundColor:'white', alignItems:'center'}}>
            <View style={{backgroundColor:'white',
            shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
marginBottom:20,
width:'80%',
             height:100}}>
            </View>
        </View>

        <View style={{backgroundColor:'white', alignItems:'center'}}>
            <View style={{backgroundColor:'white',
            shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
marginBottom:20,
width:'80%',
             height:100}}>
            </View>
        </View>




        
      </View>


</ScrollView>

    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },
    box1: {
      position: 'absolute',
      width: '100%',
      height: 140,
      backgroundColor: '#3498db'
    },
    box2: {
      position: 'absolute',
      top: 70,
      width: '100%',
      alignItems:'center',
      height: 120,
    },
    box_top:{
      width:200

    },
    text: {
      color: 'white',
      fontSize: 80
    }
  }
)