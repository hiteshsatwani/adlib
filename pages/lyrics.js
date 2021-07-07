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
import router, { useRouter } from 'next/router'
import Dock from './components/Navbar/DockBar'



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

    const router = useRouter()


    const [title, settitle] = useState('Nothing Playing')
    const [artist, setartist] = useState('Nothing Playing')
    const [albumart, setalbumart] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/1024px-Solid_black.svg.png")
    const [albumname, setalbumname] = useState('None')
    const [forceupdate, setforceupdate] = useState(0)



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
                            setalbumart("https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/1024px-Solid_black.svg.png")
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
            setforceupdate((forceupdate) => forceupdate + 1)
        }
        )
    }




    useEffect(() => {
        getNowPlaying()
    }, []);

    const forceupdatef = () => {
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                setState({ progress: response.progress_ms })
                setforceupdate((forceupdate) => forceupdate + 1)
            })
    }
    if (session) {
        if (lrc.length == 0) {



            return (
                <div>

                    <>
                        <div className="bckgrnd min-h-screen" style={{ backgroundImage: "url(" + albumart + ")", }}>

                        </div>
                        <div className="absolute w-screen">
                            {/* <Navbar /> */}

                            {spotifyApi.setAccessToken(session.accessToken)}
                            <MusicCard artist={artist} title={title.replace(/ *\([^)]*\) */g, "")} img={albumart} albumname={albumname.replace(/ *\([^)]*\) */g, "")} />
                            <CurrentLine key={forceupdate} lyrics={null} />
                            <div class="block ml-5 mt-2">
                                <button onClick={() => forceupdatef()} type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md border border-white hover:bg-blue-50">Re-Sync</button>
                                <div class="float-right mr-5">
                                    <button onClick={() => router.push('/')} type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md border border-white hover:bg-blue-50">Home</button>
                                </div>
                            </div>
                        </div>

                    </>

                </div >
            )
        } else {
            return (
                <div>

                    <>
                        <div className="bckgrnd min-h-screen" style={{ backgroundImage: "url(" + albumart + ")", }}>

                        </div>
                        <div className="absolute w-screen h-screen">
                            {/* <Navbar /> */}

                            {spotifyApi.setAccessToken(session.accessToken)}
                            <MusicCard artist={artist} title={title.replace(/ *\([^)]*\) */g, "")} img={albumart} albumname={albumname.replace(/ *\([^)]*\) */g, "")} />
                            <CurrentLine key={forceupdate} lyrics={lrc} />
                            <div class="block ml-5 mt-2">
                                <button onClick={() => forceupdatef()} type="button" class="focus:outline-none text-primary text-sm py-2.5 px-5 rounded-md border border-white hover:bg-blue-50">Re-Sync</button>
                                <div class="float-right mr-5">
                                    <button onClick={() => router.push('/')} type="button" class="focus:outline-none text-primary text-sm py-2.5 px-5 rounded-md border border-white hover:bg-blue-50">Home</button>
                                </div>
                            </div>

                        </div>

                    </>

                </div>
            )


        }
    } else {
        return (
            <>
                <div className="bg-primary min-h-75 h-auto flex" >
                    <div className="m-auto">
                        <div className="w-card h-auto pb-5 bg-secondary rounded-lg pl-20 pr-20" onClick={() => signIn("spotify")}>
                            <div className="text-primary text-md pt-5 font-m-heavy text-center">
                                Sign In
                            </div>
                        </div>
                    </div>

                </div>
                <div className="block md:hidden">
                    <Dock />
                </div>
            </>
        )
    }

}




export default LyricsApp