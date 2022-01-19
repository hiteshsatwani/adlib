import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { decode as atob, encode as btoa } from 'base-64'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpotifyWebApi from 'spotify-web-api-js';
import firebase from 'firebase/app'
const spotifyApi = new SpotifyWebApi()


export const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export const config = {

  clientId: 'b69d1a3385bc4b92beb6f144574078e8',
  clientSecret: '84749aa5ae8246cfab7e58de47e17cd6',
  scopes: ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-top-read', 'user-modify-playback-state', 'playlist-read-private', 'playlist-modify-public', 'playlist-modify-private'],
  redirectUri: makeRedirectUri({ native: 'adlib://' }),
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

export const firebaseConifg = {

  // apiKey: "AIzaSyB3qzhb5V8Y-L-4R7TO_ocfSPAuKcfMg4k",
  // authDomain: "adlib-app-2d2b1.firebaseapp.com",
  // projectId: "adlib-app-2d2b1",
  // storageBucket: "adlib-app-2d2b1.appspot.com",
  // messagingSenderId: "37621229835",
  // appId: "1:37621229835:web:23c948ffaa4d7c2fea9a0e",
  // measurementId: "G-3TF3D9ZPZD"

  apiKey: "AIzaSyDGUXH8aB7N-nqKBqFROt_C2x0pBfYWI30",
  authDomain: "lyrics-api-b7dfc.firebaseapp.com",
  projectId: "lyrics-api-b7dfc",
  storageBucket: "lyrics-api-b7dfc.appspot.com",
  messagingSenderId: "913200892921",
  appId: "1:913200892921:web:99043ee0fd14773a954b28"

}


export const getToken = async (code) => {
  const credsB64 = btoa(`${config.clientId}:${config.clientSecret}`);

  return axios('https://accounts.spotify.com/api/token', {
    method: 'post',
    headers: {
      'Authorization': `Basic ${credsB64}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: `grant_type=authorization_code&code=${code}&redirect_uri=${config.redirectUri}`
  }).then(tokenResponse => {
    const storageValue = tokenResponse.data;
    storeLoginData(storageValue.access_token, storageValue.refresh_token, (Date.now() + storageValue.expires_in * 1000).toString(), 'spotify')
    spotifyApi.setAccessToken(storageValue.access_token)
  }
  ).catch((error) => {
  })
}

export const refreshAccessToken = async (refreshtoken) => {
  const encodedData = btoa(`${config.clientId}:${config.clientSecret}`);

  return axios("https://accounts.spotify.com/api/token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + encodedData
    },
    method: "POST",
    data: `grant_type=refresh_token&refresh_token=${refreshtoken}`
  }).then((response) => {
    const storageValue = response.data
    if (response.status == 200) {
      storeLoginData(storageValue.access_token, refreshtoken, (Date.now() + storageValue.expires_in * 1000).toString(), 'spotify')
      return storageValue.access_token
    } else {
      return null
    }
  })
}



export const getTokenNoSpotifyUser = async () => {
  const credsB64 = btoa(`${config.clientId}:${config.clientSecret}`);

  axios('https://accounts.spotify.com/api/token', {
    method: 'post',
    headers: {
      'Authorization': `Basic ${credsB64}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: `grant_type=client_credentials`
  }).then(tokenResponse => {
    storeLoginData(tokenResponse.data.access_token, 'none', (Date.now() + tokenResponse.data.expires_in * 1000).toString(), 'email')
    setaccesstoken(tokenResponse.data.access_token)
    sethasloaded(true)
  }).catch((error) => {

  })
}


export const storeLoginData = async (accesstoken, refreshtoken, expires, provider) => {
  try {
    await AsyncStorage.setItem('@accessToken', accesstoken)
    await AsyncStorage.setItem('@refreshToken', refreshtoken)
    await AsyncStorage.setItem('@expires', expires)
    await AsyncStorage.setItem('@provider', provider)
  } catch (e) {
    // saving error
  }
}

export const getLoginData = async () => {

  try {
    const accesstoken = await AsyncStorage.getItem('@accessToken')
    const refreshtoken = await AsyncStorage.getItem('@refreshToken')
    const expires = await AsyncStorage.getItem('@expires')
    const provider = await AsyncStorage.getItem('@provider')
    if (accesstoken !== null) {
      var jsobj = {
        accessToken: accesstoken,
        refreshToken: refreshtoken,
        expires: expires,
        provider: provider
      }
      return jsobj
    } else {
      return null
    }
  } catch (e) {
    // error reading value
  }
}

export const runAuthCheck = () => {
  return getLoginData().then((result) => {
    if (result != null) {
      if (result.provider == 'spotify') {
        if (Date.now() < parseInt(result.expires)) {
          return result.accessToken
        } else {
          return refreshAccessToken(result.refreshToken).then((result) => { return result })
        }
      }
    } else {
      return null
    }
  })
}

export const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    // saving error
  }
}

export const getSpotifyAuthToken = async () => {
  return getLoginData().then((result) => {
    return result.accessToken
  })
}