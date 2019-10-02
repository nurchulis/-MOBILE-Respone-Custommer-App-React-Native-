/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, Image, Keyboard, AsyncStorage, ScrollView, PixelRatio, Dimensions, StyleSheet, StatusBar} from 'react-native'
import { Container, DatePicker, Item, Icon, Picker, Badge } from "native-base";
import { withNavigation } from 'react-navigation'
import CheckBox from 'react-native-check-box'
//  import jwtDecode from 'jwt-decode'

//import custom components
import Input from '../components/Input'
import Button from '../components/Button'

import api from '../api'
import validation from '../validation'
import { TextInput } from 'react-native-gesture-handler';
//import service from '../../service'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window');

export default class FormRespon extends Component {

	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Form Respon",
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
	    this.email = React.createRef()
	    this.name = React.createRef()
    	this.phone = React.createRef()
    	this.password = React.createRef()
    	this.repassword = React.createRef()

    	this.state = { 
    		username: '',
            email: '',
            kantor:'',
            alamat:'',
    		no_hp: '',
    		password: '',
    		password_repeat: '',
    		isLoading: false,
    		term: false,
    		error: true,
			remember:true,
			selected2: undefined,
			chosenDate: new Date(),
		}
		
		this.setDate=this.setDate.bind(this)
	}

	onValueChange2(value: string) {
		this.setState({
		  selected2: value
		});
	  }

	setDate(newDate) {
		this.setState({ chosenDate: newDate });
	}
	

	// constructor(props) {
	//     super(props)
	//     this.nama_konsument = React.createRef()
	//     this.alamat = React.createRef()
    // 	this.sumber_respone = React.createRef()
	// 	this.tgl = React.createRef()
	// 	this.status = React.createRef()
	// 	this.minat_lokasi = React.createRef()
	// 	this.jadwal = React.createRef()
    // 	this.catatan = React.createRef()

    // 	this.state = { 
	// 		id_respone:'',
	// 		id_user:'',
	// 		nama_konsument:'',
	// 		alamat:'',
	// 		sumber_respone:'',
	// 		tgl:'',
	// 		catatan:'',
	// 		status:'',
	// 		minat_lokasi:'',
	// 		jadwal:'',
    // 		isLoading: false,
    // 		term: false,
    // 		error: true,
    // 		remember:true
    // 	}
	// }

	//fungsi pindah ke halaman login
	_login = () => {
		this.props.navigation.navigate('Login')
	}
    

	_activation = () => {
		this.props.navigation.navigate('Activation', {email:this.state.email})	
    }
    register = (data) => {
        return api.post('registration', data)
            .then(response => {
                let responseData = response.data
                if (responseData.success === "true"){
                    //return responseData.data
                    alert('berhasil')
	                this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
                }else{
                    alert('gagal membuat akun')
                }
            })
            .catch(e => {
                return false
            })
    }

	//fungsi register
	async _register () {
		this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
        Keyboard.dismiss()
        this.register(this.state)
       // alert(JSON.stringify(this.state))
        //if (await service.auth.register(this.state)) {
		//	this._activation()
	//		this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
	//	} else {
	//		alert('gagal membuat akun!')
	//		this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
	//	}
	}

	//fungsi cek error form
	_isError () {
		// console.log('nama :'+(this.state.errorName != '')+' email :'+(this.state.errorEmail != '')+' phone :'+(this.state.errorPhone != '')+' password :'+(this.state.errorPassword != '')+' repet :'+(this.state.errorRepeatPassword != ''))
		if ( (this.state.errorName != '') || (this.state.errorEmail != '') || (this.state.errorPassword != '') || (this.state.errorPhone != '') || (this.state.errorRepeatPassword != '') || !this.state.term ){
			// console.log('true')
			return true
		} else {
			// console.log('false')
			return false
		}
	}

	render() {
		return (
			<ScrollView contentContainerStyle={{backgroundColor: 'white'}}>
				<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
				<View style={styles.container}>
					<Input 
						onChangeText={(text) => this.setState({ 
													username: text, 
													errorName: validation.validate('username', text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						errorMessage={ this.state.errorName }
						returnKeyType="next" 
						onRef={this.name}
						onSubmitEditing={() => this.email.current.focus() }
						label="Nama Konsumen"/>

					<Input
						onChangeText={(text) => this.setState({ 
													email: text, 
													errorEmail: validation.validate('email', text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						errorMessage={ this.state.errorEmail }
						onRef={this.email}
						returnKeyType="next" 
						onSubmitEditing={() => this.phone.current.focus() } 
						label="Alamat Respon "/>

						{/* Sumber Respon Dropdown*/}

													
					<Item picker style={styles.pickerContainer}>
					<Picker
						mode="dropdown"
						iosIcon={<Icon name="arrow-down" />}
						style={{ width:'100%' }}
						label="Sumber Respone"
						placeholderStyle={{ color: "#000000" }}
						placeholderIconColor="#007aff"
						selectedValue={this.state.selected2}
						onValueChange={this.onValueChange2.bind(this)}
					>
						<Picker.Item label="OLX" value="key0" />
						<Picker.Item label="Rumah diJual" value="key1" />
						<Picker.Item label="Rumah123" value="key2" />
						<Picker.Item label="Facebook" value="key3" />
						<Picker.Item label="Instagram" value="key4" />
						<Picker.Item label="LinkedInd" value="key5" />
					</Picker>
					</Item>
						
					
					{/* Tanggal Date Picker */}

				
					<Item reguler style={styles.dateContainer}>
					<Text>
						Tanggal Survei: {this.state.chosenDate.toString().substr(4, 12)}
						</Text>
					<DatePicker
						defaultDate={new Date(2018, 4, 4)}
						minimumDate={new Date(2018, 1, 1)}
						maximumDate={new Date(2018, 12, 31)}
						locale={"en"}
						timeZoneOffsetInMinutes={undefined}
						modalTransparent={false}
						animationType={"fade"}
						androidMode={"spinner"}
						placeHolderText="Masukkan Tanggal"
						textStyle={{ color: "green" }}
						placeHolderTextStyle={{ color: "#d3d3d3" }}
						onDateChange={this.setDate}
						disabled={false}
						/>
						
						</Item>



						<Input
						onChangeText={(text) => this.setState({ 
													email: text, 
													errorEmail: validation.validate('email', text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						errorMessage={ this.state.errorEmail }
						onRef={this.email}
						returnKeyType="next" 
						onSubmitEditing={() => this.phone.current.focus() } 
						label="Status Respone "/>


						<Input
						onChangeText={(text) => this.setState({ 
													email: text, 
													errorEmail: validation.validate('email', text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						errorMessage={ this.state.errorEmail }
						onRef={this.email}
						returnKeyType="next" 
						onSubmitEditing={() => this.phone.current.focus() } 
						label="Minat Lokasi "/>	

						
						<Input
						onChangeText={(text) => this.setState({ 
													email: text, 
													errorEmail: validation.validate('email', text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						errorMessage={ this.state.errorEmail }
						onRef={this.email}
						returnKeyType="next" 
						onSubmitEditing={() => this.phone.current.focus() } 
						label="Jadwal "/>
					<View style={styles.textAreaContainer}> 
					<TextInput 
						style={styles.textArea}
						numberOfLines={10}
						multiline={true}
						placeholder="Catatan"
     					placeholderTextColor="grey"
						onChangeText={(text) => this.setState({ 
													no_hp: text, 
													errorPhone: validation.validate('no_hp', text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						errorMessage={ this.state.errorPhone }
						onRef={this.phone}
						returnKeyType="next" 
						onSubmitEditing={() => this.password.current.focus() } 
						label="Catatan"/>
					</View>


				

					<Button 
						title="Simpan" 
						style={{backgroundColor:'#04a3e7', marginTop:16}} 
						loading={this.state.isLoading} 
						textStyle={{color:'white'}}
						onPress={this._register.bind(this)}/>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			marginVertical: 40,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'white'
		},
		footer: {
			marginTop: 20,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#FFFFFF'
		},
		text: {
			color: '#070707'
		},pickerContainer: {
			flex:1,
			marginTop:-10,
			marginRight:35,
			marginBottom:5,
			marginLeft:35
		},dateContainer:{
			width:'80%',
			marginTop:10,
			marginBottom:10
		},
		textAreaContainer: {
			borderColor:'#dcdde1',
			borderWidth: 1,
			padding: 5,
			marginBottom:20
		},
		textArea: {
			width:280,
			height:200,
			textAlignVertical: 'top'
			
		}
	}
)