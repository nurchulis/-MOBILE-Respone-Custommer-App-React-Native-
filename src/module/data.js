import { AsyncStorage } from 'react-native'
import api from '../api'


getUserId = async () => {
    const userToken = await AsyncStorage.getItem('user')
    let user = userToken
    return user
}

getToken = async () => {
  const userToken = await AsyncStorage.getItem('token')
  let user = userToken
  return user
}

storeData = async (key,data) => {
  	try {
    	await AsyncStorage.setItem(key, JSON.stringify(data))
    	return true
  	} catch (error) {
  		return false
  	}
}

getProfile = async () => {
  const userProfile = await AsyncStorage.getItem('profile')
  let profile = JSON.parse(userProfile)
  // console.log(user.id)
  return profile
}

getnameFound = async () => {
  const userProfile = await AsyncStorage.getItem('email_found')
  let profile = JSON.parse(userProfile)
  // console.log(user.id)
  return profile
}

getavaFound = async () => {
  const userProfile = await AsyncStorage.getItem('avatar_found')
  let profile = JSON.parse(userProfile)
  // console.log(user.id)
  return profile
}

getName = async () => {
  const userProfile = await AsyncStorage.getItem('Getname')
  let name = JSON.parse(userProfile)
  // console.log(user.id)
  return name
}

getEmail = async () => {
  const userProfile = await AsyncStorage.getItem('Getemail')
  let name = JSON.parse(userProfile)
  // console.log(user.id)
  return name
}

getAvatar = async () =>{
  const avatar = await AsyncStorage.getItem('Getavatar')
  let avatar_ = JSON.parse(avatar)

  return avatar_
}


removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    return true
  } catch (error) {
    return false
  }
}

export default { storeData, removeData, getUserId, getProfile,getToken,  getName, getEmail, getAvatar, getnameFound, getavaFound }