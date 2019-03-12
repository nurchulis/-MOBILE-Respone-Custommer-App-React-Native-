/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, AsyncStorage, ActivityIndicator, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation'
import QRCode from 'react-native-qrcode'
import api from '../api'
import Data from '../module/data'

//import custom components
import Button from '../components/Button'

export default class ListFriend extends Component {

    //config header pencarian
  static navigationOptions = {
      headerTitle: "Undangan",
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

    this.state = {
      data:'',
      isLoading: false,
    }
  }


  _keyExtractor = (item, index) => item.id

  
 
async componentDidMount () {

    let id_user =  await Data.getUserId()
    alert(id_user)
    this.setState({data:await Data.getUserId()})
  }

	render () {
  		return (
  			<View style={styles.container}>
          <View style={{ padding:32, alignItems:'center', flex:8}}>
                    <Text style={{marginBottom:64}}>Arahkan scanner ke Qrcode berikut</Text>
                    <QRCode
                      value={this.state.data}
                      size={250}
                      bgColor='black'
                      fgColor='white'/>
                  </View>
        </View> 
  		)
    }
	
}

const styles = StyleSheet.create(
	{
		container: {
			paddingHorizontal:16,
			flex: 1,
			backgroundColor: 'white'
		}
	}
)