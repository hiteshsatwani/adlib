import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import "firebase/firestore";
import SpotifyWebApi from 'spotify-web-api-js';
import { getSpotifyAuthToken } from './auth';
const spotifyApi = new SpotifyWebApi();


export async function getPostData(trackid: string) {

    const db = firebase.firestore()
    var docRef = db.collection("PostData").doc(trackid);
    return docRef.get().then((doc) => {
        if (doc.exists) {
            return doc.data()
        } else {
            var datastructure = {
                id: trackid,
                likes: 0,
                users_liked: [],
                comments: 0,
                comment_data: []
            }
            docRef.set(datastructure)
            return datastructure
        }
    }).catch((error) => {

    });
}

export async function likeTrack(trackid: string, userid: string, provider: string) {



    const db = firebase.firestore()
    var docRef = db.collection("UserLikes").doc(provider + ":" + userid);
    docRef.update({
        liked: firebase.firestore.FieldValue.arrayUnion(trackid)
    })

    docRef.get().then((doc) => {
        if (doc.exists) {
            docRef.update({
                liked: firebase.firestore.FieldValue.arrayUnion(trackid)
            })
        } else {
            docRef.set({
                liked: [trackid]
            })
        }

    }
    )



}

export async function getStoredUserData(userid: string, provider: string) {

    const db = firebase.firestore()
    var docRef = db.collection("UserLikes").doc(provider + ":" + userid);

    return docRef.get().then((doc) => {
        if (doc.exists) {
            return doc.data()
        } else {
            return null
        }
    }
    )
}


export async function setUserPreferencesEmail(userid: string, genres: string, artists: string) {

    const db = firebase.firestore()
    var docRef = db.collection("EmailUsers").doc(userid);

    docRef.get().then((doc) => {
        if (!doc.exists) {
            docRef.set({
                genres: genres,
                artists: artists
            })
        }
    }
    )
}

export async function getUserPreferences(userid: string) {

    const db = firebase.firestore()
    var docRef = db.collection("EmailUsers").doc(userid);

    return docRef.get().then((doc) => {
        if (doc.exists) {
            var jsobj = {
                artists: doc.data()?.artists,
                genres: doc.data()?.genres
            }
            return jsobj
        }
    }
    )


}

export const signOut = async () => {
    try {
      await AsyncStorage.removeItem("@accessToken")
      await AsyncStorage.removeItem("@refreshToken")
      await AsyncStorage.removeItem("@expires")
      await AsyncStorage.removeItem("@provider")
      await AsyncStorage.removeItem("@email")
      await AsyncStorage.removeItem("@password")
      throw new Error("Not-an-error: restart")
    } catch (e) {
      // saving error
    }
  }
  
export async function removeLike(trackid: string, userid: string, provider: string) {

    if (provider == null) {
        provider = 'spotify'
    }


    const db = firebase.firestore()
    var docRef = db.collection("UserLikes").doc(provider + ":" + userid);
    docRef.update({
        liked: firebase.firestore.FieldValue.arrayUnion(trackid)
    })

    docRef.get().then((doc) => {
        if (doc.exists) {
            docRef.update({
                liked: firebase.firestore.FieldValue.arrayRemove(trackid)
            })
        }
    }
    )

}

export async function isFullyRegistered(userid: string) {
    const db = firebase.firestore()
    var docRef = db.collection("EmailUsers").doc(userid);
    return docRef.get().then((doc) => {
        if (doc.exists) {
            return true
        } else {
            return false
        }
    }
    )
}

export const getProfileData = async () => {
    const token = await getSpotifyAuthToken()
    spotifyApi.setAccessToken(token)
    const provider = 'spotify'

    if (provider == "spotify") {
        const spotifyUserdata = await spotifyApi.getMe()
        const storeddata = await getStoredUserData(spotifyUserdata.id, provider)
        var jsobj = {
            "userid": spotifyUserdata.id,
            "name": spotifyUserdata.display_name,
            "profilehref": spotifyUserdata.images![0].url,
            "liked_tracks": storeddata!.liked,
            "no_liked": storeddata!.liked.length
        }
        return jsobj
    } else {
        return null
    }

}

export const getSongData = async (tracklist: any) => {
    const token = await getSpotifyAuthToken()
    spotifyApi.setAccessToken(token)

    const tracksdata = await spotifyApi.getTracks(tracklist)
    return (tracksdata)
}

export const getArtistSongs = async (artistid: string) => {
    const token = await getSpotifyAuthToken()
    spotifyApi.setAccessToken(token)

    const data = await spotifyApi.getArtistTopTracks(artistid, 'US')

    return data.tracks

}

export const getPlaylists = async () => {
    const token = await getSpotifyAuthToken()
    spotifyApi.setAccessToken(token)
    const username = (await spotifyApi.getMe()).id
    const data = await spotifyApi.getUserPlaylists(username)
    return data
}

export const addToPlaylist = async (playlistid: string, trackuri: string) => {
    const token = await getSpotifyAuthToken()
    spotifyApi.setAccessToken(token)
    try {
        await spotifyApi.addTracksToPlaylist(playlistid, [trackuri])
    } catch (err) {
        const error = err as SpotifyApi.ErrorObject
        alert('Unknown Error Occured. Is this your playlist?')
    }

}
export const getSongURI = async (trackid: string) => {
    const token = await getSpotifyAuthToken()
    spotifyApi.setAccessToken(token)
    const data = spotifyApi.getTrack(trackid)
    return (await data).uri
}