import { timers } from 'jquery';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { checkcache, getLRC } from '../functions'
import { signIn, signOut, useSession } from 'next-auth/client'
import SpotifyWebApi from 'spotify-web-api-js';
import firebase from 'firebase'
import CurrentLine from './components/currentLine'
import { Context } from './store';
import Navbar from './components/Navbar/Navbar'
import MusicCard from './components/card/musiccard'



const LyricsApp = () => {

    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyDGUXH8aB7N-nqKBqFROt_C2x0pBfYWI30",
            authDomain: "lyrics-api-b7dfc.firebaseapp.com",
            projectId: "lyrics-api-b7dfc",
            storageBucket: "lyrics-api-b7dfc.appspot.com",
            messagingSenderId: "913200892921",
            appId: "1:913200892921:web:99043ee0fd14773a954b28"
        });
    }

    const [lrc, setLRC] = useState([])

    const [session, loading] = useSession()

    const spotifyApi = new SpotifyWebApi();

    const [state, setState] = useContext(Context)


    const [title, settitle] = useState('Nothing Playing')
    const [artist, setartist] = useState('Nothing Playing')
    const [albumart, setalbumart] = useState("https://i.pinimg.com/originals/b5/bb/ed/b5bbed340753c7e267840e9f67623b1f.jpg")
    const [albumname, setalbumname] = useState('None')



    const getNowPlaying = () => {
        var currentlyPlaying = ''
        setInterval(() => {
            spotifyApi.getMyCurrentPlaybackState()
                .then((response) => {
                    setState({ progress: response.progress_ms })
                    if (currentlyPlaying !== response.item.name) {
                        try {
                            settitle(response.item.name)
                            setartist(response.item.artists[0].name)
                            setalbumart(response.item.album.images[0].url)
                            setalbumname(response.item.album.name)
                            getLyrics(response.item.name, response.item.artists[0].name)
                            currentlyPlaying = response.item.name

                        } catch (err) {
                            console.log(err)
                            settitle(response.item.name)
                            setartist(response.item.artists[0].name)
                            setalbumart("https://i.pinimg.com/736x/ae/dc/45/aedc457b2cdad874b38dc69015e561ee.jpg")
                            setalbumname(response.item.album.name)
                        }
                    }
                })

        }, 7000);
    }


    const getLyrics = (song, artist) => {

        // reset()
        // setfunc((func) => func + 1)

        checkcache(song, artist).then((result) => {
            setLRC(result)
        }
        )
    }




    useEffect(() => {
        getNowPlaying()
    }, []);

    if (lrc.length == 0) {
        return (
            <div>

                {!session && <>
                    Not signed in <br />
                    <button onClick={() => signIn()}>Sign in</button>
                </>}
                {session &&
                    <>
                        <div className="bckgrnd min-h-screen" style={{ backgroundImage: "url(" + albumart + ")", }}>

                        </div>
                        <div className="absolute w-screen">
                            {/* <Navbar /> */}

                            {spotifyApi.setAccessToken(session.accessToken)}
                            <MusicCard artist={artist} title={title.replace(/ *\([^)]*\) */g, "")} img={albumart} albumname={albumname.replace(/ *\([^)]*\) */g, "")} />

                        </div>

                    </>
                }
            </div >
        )
    } else {
        return (
            <div>
                {!session && <>
                    Not signed in <br />
                    <button onClick={() => signIn()}>Sign in</button>
                </>}
                {session &&
                    <>
                        <div className="bckgrnd min-h-screen" style={{ backgroundImage: "url(" + albumart + ")", }}>

                        </div>
                        <div className="absolute w-screen h-screen">
                            {/* <Navbar /> */}

                            {spotifyApi.setAccessToken(session.accessToken)}
                            <MusicCard artist={artist} title={title.replace(/ *\([^)]*\) */g, "")} img={albumart} albumname={albumname.replace(/ *\([^)]*\) */g, "")} />
                            <CurrentLine key={lrc} lyrics={lrc} />
                       
                        </div>

                    </>
                }
            </div>
        )


    }





}

export default LyricsApp