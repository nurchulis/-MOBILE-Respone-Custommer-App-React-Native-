import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import React, { Component } from 'react'

import NavHome from './NavHome'
import NavAuth from './NavAuth'
import Splash from '../views/Splash'


const AppNavigator = createSwitchNavigator(
  {
    NavHome: NavHome,
    NavAuth: NavAuth,
    Splash: Splash
  },
  {
    initialRouteName: 'Splash'
  }
);

export default createAppContainer(AppNavigator)