import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import Home from '../views/Home'
import ListFriend from '../views/ListFriend'
import Profile from '../views/Profile'
import AddRespone from '../views/AddRespone'
import userFound from '../views/userFound'

const NavBottomTabStaff = createBottomTabNavigator(
  {
    Home: Home,
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
            icon = 'nature-people'
          } 
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Icon name={icon} size={25} color={tintColor} />
        },
        tabBarLabel: label == 'Home' ? 'Beranda' : label == 'ListFriend' ? 'Undang Teman': 'Profile'
      })
    },
    tabBarOptions: {
      activeTintColor: '#1abc9c',
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
        headerTitle: routeName == 'Home' ? 'Beranda' : routeName == 'ListFriend' ? 'Undang Teman' : 'Pengaturan',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
          fontSize:16
        },
        headerRightContainerStyle: {
          marginRight: 8,
        },
        headerStyle: {
          elevation: 1,
          backgroundColor: '#1abc9c',
          height: 50
        }
      })
    },
  },

  AddRespone: {
    screen: AddRespone
  },
  userFound: {
    screen: userFound
  }
  //ChooseCounter: {
    //screen: ChooseCounter
  //},
  //ChangePasswordStaff: {
    //screen: ChangePasswordStaff
  //},
})

export default NavHome
