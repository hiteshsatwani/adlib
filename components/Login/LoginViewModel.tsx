import { action, makeAutoObservable, observable } from "mobx";
import * as GoogleSignIn from 'expo-google-sign-in';
import firebase from 'firebase';
import { makeRedirectUri } from "expo-auth-session";

class LoginViewModel {
    constructor() {
        makeAutoObservable(this)
    }

    @observable public testString = "";

    @observable public isLoggedIn: string = "loading";

    @observable public spotifyAccessToken: string = ""

    @action public setLoggedIn(val: string): void {
        this.isLoggedIn = val
    }

    @observable public user = null

    @action public setSpotifyAccessToken(val: string): void {
        this.spotifyAccessToken = val
    }

    

    

    
}

export default LoginViewModel