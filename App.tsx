import {
  Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold, useFonts
} from '@expo-google-fonts/montserrat';
import { makeRedirectUri } from 'expo-auth-session';
import * as Analytics from 'expo-firebase-analytics';
import firebase from 'firebase/app';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { ActivityIndicator, LogBox, View } from 'react-native';
import SpotifyWebApi from 'spotify-web-api-js';
import AppViewModel from './AppViewModel';
import AppViewController from './components/AppViewController';
import HomeViewModel from './components/Home/homeViewModel';
import LoginViewController from './components/Login/LoginViewController';
import LoginViewModel from './components/Login/LoginViewModel';
import ProfileViewModel from './components/Profile/profileViewModel';
import { firebaseConifg, runAuthCheck } from './components/services/auth';
import { Audio } from 'expo-av'

LogBox.ignoreLogs(['Setting a timer', 'Cannot complete operation because audio is not enabled.']);


const appViewModel = new AppViewModel()
const profileViewModel = new ProfileViewModel()
const loginViewModel = new LoginViewModel()
const spotifyApi = new SpotifyWebApi()

const App = () => {

  if (!firebase.apps.length) {

    firebase.initializeApp(firebaseConifg)
  }

  let [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold
  });

  useEffect(() => {
    console.log(makeRedirectUri({ native: 'adlib://' }))
    Audio.requestPermissionsAsync();
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
    });
    runAuthCheck().then((result) => {
      if (result == null) {
        loginViewModel.setLoggedIn("false")
      } else {
        loginViewModel.setSpotifyAccessToken(result.accessToken)
        spotifyApi.setAccessToken(result.accessToken)
        loginViewModel.setLoggedIn("true")
      }
    })
    Analytics.logEvent('AppOpen', {
      screen: 'Log In',
      purpose: 'App was opened',
    });
  }, [])

  if (!fontsLoaded) {
    return null
  } else {
    if (loginViewModel.isLoggedIn == "true") {
      return <AppViewController loginViewModel={loginViewModel} profileViewModel={profileViewModel} flow='spotify' />
    } else if (loginViewModel.isLoggedIn == "false") {
      return <LoginViewController loginViewModelA={loginViewModel} />
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: '#000000', alignContent: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#1DB954" />
        </View>
      )
    }

  }
}



export default observer(App)
