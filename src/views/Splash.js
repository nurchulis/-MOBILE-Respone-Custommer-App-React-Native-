/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, AsyncStorage, StatusBar } from 'react-native'
import { withNavigation } from 'react-navigation';

import Button from '../components/Button'
import api from '../api'
import Data from '../module/data'

var {height, width} = Dimensions.get('window');

export default class Splash extends Component {
	constructor(props) {
	    super(props)
	    this._bootstrapAsync()
	}

  	_bootstrapAsync = async () => {
  		const user_id = await AsyncStorage.getItem('user')
	    
	    // Function For ger User Session If have login will to 
	    	if(user_id){
	    				this.props.navigation.navigate('NavHome')
	    	} else {
	    		this.props.navigation.navigate('NavAuth')
	    	}
	}


	_getDataUser (user) {
		api.get('user/'+user)
			.then(response => {
				let responseData = response.data
				if (responseData.success === 'true'){
					if(data.storeData('Getname',responseData.username)){
					if(data.storeData('Getemail',responseData.email)){
						if(data.storeData('Getavatar',responseData.avatar)){	
						alert('Selamat Datang ID : '+response.data.username)
						this._home(user)
					}
				   }	
				  } 
				}
			})
			.catch(e => {
				alert(JSON.stringify(e))
			})	
	}	


	render () {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white'
	}
})
