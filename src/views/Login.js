/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { 
	Text, 
	View, 
	Image, 
	StatusBar, 
	KeyboardAvoidingView, 
	PixelRatio, 
	StyleSheet, 
	AsyncStorage,
	Keyboard,
	ScrollView
} from 'react-native'
import { withNavigation } from 'react-navigation'

//import custom components
import Button from '../components/Button'
import Input from '../components/Input'

import api from '../api'
import data from '../module/data'
import validation from '../validation'

export default class Login extends Component {

	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Masuk",
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
	    super(props)
	    this.a = React.createRef()
	    this.b = React.createRef()

	   	this.state = {
	    	username: '',
	    	password: '',
	    	remember:true,
	    	isLoading: false,
	    	error:true
	    }
	}
	


	_home = () => {
		this.props.navigation.navigate('NavHome')
	}
	_registration = () => {
		this.props.navigation.navigate('Register')
	}


	_getDataUser (id_user, token) {
		alert(token)
		const iniToken = 'Bearer '+token
		let config = {
	      headers: {
	       'Authorization': iniToken
	      }
	    }

		api.get('User/'+id_user, config)
			.then(response => {
				let responseData = response.data
				if (responseData.success === 'true'){
					if(data.storeData('Getname',responseData.username)){
					if(data.storeData('Getemail',responseData.email)){
						if(data.storeData('Getavatar',responseData.kantor)){	
						alert('Selamat Datang ID : '+response.data.kantor)
						this._home()
					}
				   }	
				  } 	
				}
			})
			.catch(e => {
				
				alert(JSON.stringify(e))
			})	
	}	


	async _chooseNav (id_user, token) {
		console.log(await data.storeData('user',id_user))
		if(await data.storeData('user',id_user)){
			this._getDataUser(id_user, token)
		} else {
			alert("error aplication!")
		}
	}

	//fungsi autentikasi
	_auth () {
		this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
		Keyboard.dismiss()
		api.post('login',this.state)
			.then(response => {
				let responseData = response.data
				if (responseData.message !== 'Wrong credentials'){
					let id_user = responseData.id_user
					let token = responseData.access_token
					this._chooseNav(id_user, token)
					//alert(JSON.stringify(responseData))
				} else if(responseData.message === 'Wrong credentials')
				{
				this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
					alert('Email Or password Salah')
				}
			})
			.catch(e => {
				this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
				console.log(e.response)
					if(e.response.status === 500){
							alert('Cek Koneksi !')
						
					}
				 else {
					alert('Coba periksa jaringan anda !')
				}
			})
	}

	//fungsi cek error form
	_isError () {
		if ( (this.state.errorEmail != '') || (this.state.errorPassword != '') ){
			// console.log('true')
			return true
		} else {
			// console.log('false')
			return false
		}
	}

	render () {
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				<View style={ styles.container }>
					<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
					<Input 
						onChangeText={(text) => this.setState({ 
													username: text, 
													errorEmail: validation.validate('name',text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						onRef={this.a}
						label="Email" 
						errorMessage={ this.state.errorEmail }
						returnKeyType="next" 
						onSubmitEditing={() => this.b.current.focus() }/>

					<Input
						onChangeText={(text) => this.setState({ 
													password: text, 
													errorPassword: validation.validate('password',text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						onRef={this.b} 
						password={ true }  
						errorMessage={ this.state.errorPassword }
						label="Password" />
					<Text onPress={ this._forgotPassword } style={{color: '#1abc9c', marginBottom:20}}>Lupa kata sandi?</Text>
					<Button 
						style={{backgroundColor:'#1abc9c'}} 
						loading={this.state.isLoading} 
						textStyle={{color:'white'}} 
						onPress={ this._auth.bind(this) } 
						title="Masuk" 
						disabled={ this.state.error }/>
					<Text style={ [styles.text,{marginTop:20}] }>Belum punya akun?<Text onPress={ this._registration } style={{color: '#04a3e7'}}> Daftar</Text></Text>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flexGrow: 1,
			alignItems: 'center',
			backgroundColor: 'white',
			marginVertical: 20,
		},
		inputBox: {
			flexGrow:1, 
			justifyContent: 'center',
		},
		buttonBox: {
			flexGrow:1, 
			alignItems: 'center', 
		},
		footerBox: {
			justifyContent: 'center',
			alignItems: 'center',
			flexGrow:1,
		},
		text: {  
	        color:'#070707'
	    }
	}
)
