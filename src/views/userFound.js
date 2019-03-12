/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react'
import { StyleSheet, Text, View, Dimensions, StatusBar, Image } from 'react-native'
import { withNavigation } from 'react-navigation'

import Button from '../components/Button'

import CardIcon from '../components/CardIcon'

import Data from '../module/data'

var {height, width} = Dimensions.get('window')

export default class userFound extends Component {

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
	    super(props)

	    this.state = {
	    	name:[],
	    	email:[],
	    	avatar:null,
	    	isLoading:false,
	    	error:false
	    }
	}

	async componentDidMount () {
    let email =  await Data.getnameFound()
    let avatar = await Data.getavaFound()
    //let email = await Data.getEmail()
    //let avatar = await Data.getAvatar()
    let user = this.props.navigation.getParam('kuy')
    this.setState({name:user})
    this.setState({email:email})
    this.setState({avatar:avatar})

  	}


	render () {

		//alert(tenant)
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
				<Text style={{fontSize:20, fontWeight:'bold',marginTop:80}}>Data ditemukan</Text>

				<Image 
						source={ this.state.avatar == null ? require('../static/blank-profile.png') : {uri: this.state.avatar}}
						resizeMode='cover'
          				style={{height:120,width:120, borderRadius:30, marginTop:30, marginBottom:20}}  />


				<CardIcon icon="verified-user" label="Nama User : " text={this.state.name}/>
				<CardIcon icon="email" label="Email User : " text={this.state.email}/>
			
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
