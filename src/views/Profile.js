/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, Image, Dimensions, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native'
import { StackActions, NavigationActions, withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

//import custom components
import Button from '../components/Button'
import api from '../api'
import Data from '../module/data'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

export default class Profile extends Component {

	constructor(props) {
	    super(props)
	    this.state = {
	    	profile:{},
	    	avatar:null,
	    	email:[],
	    	name:[],
	    	isLoading:false,
	    	error:false
	    }
	}

	_navAuth = async () => {
		if(await Data.removeData('user')){
			this.props.navigation.navigate('NavAuth')
		}
	}



	//pindah ke halaman login
	async _logout () {
		this.setState({isLoading:!this.state.isLoading, error:!this.state.error})

		        this._navAuth()

	}


async componentDidMount () {
    let name =  await Data.getName()
    let email = await Data.getEmail()
    let avatar = await Data.getAvatar()
    this.setState({name: name, email: email, avatar: avatar})
  }
   
	render () {
		return (
			<View style={ styles.container }>
				<View style={{flexDirection:'row', alignItems:'center', width:width, padding:16, borderBottomWidth:1, borderColor:'#cfcfcf'}}>
					<Image 
						source={ this.state.avatar == null ? require('../static/blank-profile.png') : {uri: this.state.avatar}}
						resizeMode='cover'
          				style={{height:50,width:50, borderRadius:30, marginRight:16}}  />
          			<View>
          				<Text style={{fontSize:16, fontWeight:'bold', color:'black'}}>{this.state.name}</Text>
          				<Text style={{fontSize:12,marginTop:4}}>User</Text>
          			</View>
				</View>
				<Button 
				style={{backgroundColor:'white',borderWidth:0.5, borderColor:'red', marginTop:24}} 
	            textStyle={{color:'red'}}
	            disabled={this.state.error}
	            loading={this.state.isLoading}
	            onPress={this._logout.bind(this)}
	            title="Keluar" />
			</View>
		)
		
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			alignItems: 'center',
			backgroundColor: 'white'
		},
	}
)