import { createStackNavigator } from 'react-navigation'

import Login from '../views/Login'
import Welcome from '../views/Welcome'
import Home from '../views/Home'
import Register from '../views/Register'
import FormRespon from '../views/FormRespon';


const NavAuth = createStackNavigator({
//  Welcome: {
//     screen: Welcome,
//     navigationOptions: () => ({
//       header: null
//     })
//   },
//   Login: {
//     screen: Login
//   },
  Register:{
    screen: FormRespon
  },
  Home: {
    screen: Home
  }
})

export default NavAuth