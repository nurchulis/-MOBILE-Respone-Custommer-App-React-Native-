import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import Home from '../views/Home'
import ListFriend from '../views/ListFriend'
import Profile from '../views/Profile'
import ScanBarcode from '../views/ScanBarcode'
import userFound from '../views/userFound'
import addRespond from '../views/AddRespone'
const NavBottomTabStaff = createBottomTabNavigator(
  {
    ListFriend: ListFriend,
    Profile: Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      let label = navigation.state.routeName
      return ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state
          let icon
          if (routeName === 'Home') {
            icon = 'home'
          } else if (routeName === 'ListFriend') {
            icon = 'list'
          } else if (routeName === 'Profile') {
            icon = 'user'
          } 
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Icon name={icon} size={25} color={tintColor} />
        },
        tabBarLabel: label == 'Home' ? 'Beranda' : label == 'ListFriend' ? 'Daftar Respon': 'Profile'
      })
    },
    headerTransparent: true,
    tabBarOptions: {
      activeTintColor: '#3498db',
      inactiveTintColor: '#cfcfcf',
      showLabel: true,
      labelStyle: {
        fontSize: 12,
        marginTop:-10,
        marginBottom:8
      },
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0.8,
        height: 50
      },
    }
  }
)

const NavHome = createStackNavigator({
  NavBottomTabStaff: {
    screen: NavBottomTabStaff,
    navigationOptions: ({ navigation }) => {
      let routeName = navigation.state.routes[navigation.state.index].routeName
      return ({
        headerTitle: routeName == 'Home' ? 'Beranda' : routeName == 'ListFriend' ? 'Daftar Respon' : 'Pengaturan',
        headerTintColor: 'white',

        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
          fontSize:16,
      },
        headerRightContainerStyle: {
          marginRight: 8,
        },
        shadowColor: 'transparent',
        headerTransparent: true,
        headerStyle: {
          elevation: 0,
          backgroundColor: 'transparent',
          height: 50,
          
        }
      })
    },
  },

  ScanBarcode: {
    screen: ScanBarcode
  },
  userFound: {
    screen: userFound
  },
  AddRespond:{
    screen: addRespond
  }
  //ChooseCounter: {
    //screen: ChooseCounter
  //},
  //ChangePasswordStaff: {
    //screen: ChangePasswordStaff
  //},
})

export default NavHome
