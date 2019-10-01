/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, ActivityIndicator,TouchableHighlight, ImageBackground,Alert, StatusBar,FlatList, TouchableOpacity } from 'react-native'

import api from '../api'
import { Button, Image } from 'react-native-elements';
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
        id_user:"",
        email:[],
        avatar:[],
        isLoading:true,
        isFetching: false,
        loading:false,
        error:false,
        dataPeople:[]
      }
  }

  async componentDidMount () {
    this._fetchItem()
    
    let name =  await Data.getToken()
    let email = await Data.getEmail()
    let avatar = await Data.getAvatar()
    this.setState({id_user: name, email: email, avatar: avatar})
  }
  _fetchItem = async()=>{
    return fetch('https://api-respone.herokuapp.com/api/v1/ShowRespone/1')
    .then((response)=>response.json())
    .then((responseJson)=>{
        this.setState({
            isLoading:false,
            isFetching: false,
            dataPeople:responseJson.data
        });
    })
    .catch((error)=>{
        console.error(error)
    })
  }
  
  onRefresh() {
    this.setState({ isFetching: true }, function() { this._fetchItem() });
 }

 _hapusItem (item) {
  this.setState({ isFetching: true })
  const iniToken = 'Bearer '+this.state.id_user
  let config = {
      headers: {
       'Authorization': iniToken
      }
    }

  api.get('DeleteRespone/'+item, config)
    .then(response => {
      let responseData = response.data
      if (responseData.success === 'true'){
        Alert.alert(
          'Berhasil Menghapus'
        );
       this.onRefresh()
      }
    })
    .catch(e => {
      
      alert(JSON.stringify(e))
    })	
}

Confrim_hapus(id_respone){
  Alert.alert(
    'Apakah anda ingin menghapus',
    'Ingat semua kenangan yang ingin kamu hapus',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this._hapusItem(id_respone)},
    ],
    {cancelable: false},
  );
}

  _itemComponent = ({ item })=>{
    return (
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
          <View style={{flexDirection:'row', width:'100%', padding:20}}>      
          <Image source={{ uri: 'https://freeiconshop.com/wp-content/uploads/edd/person-girl-flat.png' }} style={{ width: 50, height: 50 }}/>
          <View style={{flexDirection:'column'}}>
          <Text style={{marginLeft:20, fontSize:20, fontWeight:'bold', color:'#3498db'}}>{item.nama_konsumen}</Text>
          <Text style={{marginLeft:20}}>Bantul, Yogyakarta</Text>
          </View>
          <View style={{alignItems: 'flex-end', marginTop:10, width:DeviceWidth/4}}>
          <TouchableOpacity onPressOut = {this._fetchItem}
          //onPress={()=>this._hapusItem(item.id_respone)}
          onPress={()=>this.Confrim_hapus(item.id_respone) }
          >
          <View style={{width:100, alignItems:'flex-end'}}>
                    <Icon size={25}  name='ellipsis-v' type='evilicon' color='#517fa4'/>
                    </View>
          </TouchableOpacity>
          </View>
          </View>
      </View>
 
  </View>
    );
  }
  

  _ScanBarcode = () => {
 
    this.props.navigation.navigate('AddRespone')
  }

  render () {
    if (this.state.isLoading) {
      return(
          <View style={{padding:20}}>
              <ActivityIndicator/>
          </View>
      )
  }
    return (

 <View style={styles.container}>
<StatusBar backgroundColor="#3498db"  barStyle = "light-content" />
        <View style={styles.box1}>
        <ImageBackground source={require('../static/background-list.png')} style={{width: '100%', height: '100%'}}>
      
  </ImageBackground>
        </View>
        <View style={styles.box2}>
          <View style={{backgroundColor:'white', borderRadius:5, width:'80%', height:50,
          shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
          }}>
  
 <TouchableHighlight
     onPressOut = {this._fetchItem}>
              <Text style = {{fontSize:22,color: 'white',fontWeight: 'bold',textAlign:"center"}}>Reload Data</Text>
         </TouchableHighlight> 
        </View>
        </View>
        
        <View style={{ backgroundColor:'white', alignItems:'center', marginTop:145}}>
        </View>

        <FlatList
        data={this.state.dataPeople}
        renderItem={this._itemComponent}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.isFetching}
        
      />


      




        
      </View>



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
      backgroundColor: 'red'
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