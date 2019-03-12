/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import { withNavigation } from 'react-navigation'
import { RNCamera } from 'react-native-camera'
import Modal from 'react-native-modal'

import api from '../api'
import Data from '../module/data'

//mengambil panjang dan lebar layar
var { height, width } = Dimensions.get('window')

export default class ScanBarcode extends Component {

	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Bergabung",
    	headerTintColor: 'white',
    	headerTitleStyle: {
        	fontWeight: 'bold',
        	color: 'white',
        	fontSize:16
      	},
      	headerStyle: {
	        elevation: 1,
	        backgroundColor: '#1abc9c',
	        height: 50
	    },
  	}


	constructor(props) {
		console.disableYellowBox = true;
	    super(props)
	    this.state = {
	    	avatar:[],
	    	isBarcodeScannerEnabled: true,
	    	show:false
	    }
	}

	onBarCodeRead = (e) => {
		if(this.state.isBarcodeScannerEnabled){
			this.setState({isBarcodeScannerEnabled:false,show:true})
			this._getDataUser(e.data)
		}
	}


    async _getDataUser (user) {
		api.get('user/'+user)
			.then(response => {
				let responseData = response.data
				if (responseData.success === 'true'){
					//await data.storeData('user',user)
					if((Data.storeData('email_found',responseData.email) && (Data.storeData('avatar_found',responseData.avatar)))) {
					let user = responseData.username
					this.setState({isBarcodeScannerEnabled:true,show:false,'avatar':user})	
						//alert('Selamat Datang ID : '+response.data.username)
						
						this._userFound(user)
				
					}
				}
				
			})
			.catch(e => {
				alert(JSON.stringify(e))
	        this.setState({isBarcodeScannerEnabled:true,show:false})
			})	
	}	


	_userFound = (username) => {

		this.props.navigation.navigate('userFound',{kuy:username},{avatar:'kuy'})
	}

	render () {
		return (
			<View style={ styles.container }>
					<View>
						<Text style={{fontSize:20,fontWeight:'bold', marginTop:32, textAlign:'center'}}>Pindai untuk bergabung</Text>
						<Text style={{textAlign:'center', marginTop:8, width:width-64}}>Arahkan kamera ke area barcode Di tengah layar perangkat user lain</Text>
					</View>
					<RNCamera
						ratio={"1:1"}
					    style={styles.preview}
					    onBarCodeRead={this.onBarCodeRead}
					    ref={cam => this.camera = cam}
					    >
					</RNCamera>
					<Modal
			        isVisible={this.state.show}
			        animationIn="zoomIn"
			        animationOut="zoomOut"
			              style={{justifyContent: 'center', alignItems:'center',flex:1}}>
			              	<View style={{justifyContent:'center',alignItems:'center', height:80,width:80, backgroundColor:'white', borderRadius:8}}>
				              	<ActivityIndicator size="large" color="#4ae0b5"/>
							</View>
			        </Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create(
	{
		container: {
		    flex: 1,
		    alignItems: 'center',
		    backgroundColor: '#fff'
		},
		preview: {
			marginTop:'10%',
			height:'50%',
			width:width-100,
		}
	}
)
