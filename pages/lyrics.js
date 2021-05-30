import { timers } from 'jquery';
import React, { useState, useRef, useEffect } from 'react';
import { checkcache, getLRC } from '../functions'
import { signIn, signOut, useSession } from 'next-auth/client'
import SpotifyWebApi from 'spotify-web-api-js';
import firebase from 'firebase'


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
    const [timer, setTimer] = useState(0)
    const [currentLine, setcurrentLine] = useState('')
    const [prevLine, setprevLine] = useState('')
    const [nextLine, setnextLine] = useState('')
    const countRef = useRef(null)

    const [session, loading] = useSession()

    const spotifyApi = new SpotifyWebApi();


    var time = 0


    const [title, settitle] = useState('Nothing Playing')
    const [artist, setartist] = useState('Nothing Playing')
    const [albumart, setalbumart] = useState("https://i.pinimg.com/736x/ae/dc/45/aedc457b2cdad874b38dc69015e561ee.jpg")
    const [albumname, setalbumname] = useState('None')
    const [artistid, setartistid] = useState('')
    const [func, setfunc] = useState(0)
    const [interval, setinterval] = useState()
    const [timestamps, settimestamps] = useState([])


    const [timer2, settimer2] = useState(null)


    const getNowPlaying = () => {
        var currentlyPlaying = ''
        setInterval(() => {
            spotifyApi.getMyCurrentPlaybackState()
                .then((response) => {
                    if (currentlyPlaying !== response.item.name) {
                        try {
                            settitle(response.item.name)
                            setartist(response.item.artists[0].name)
                            setalbumart(response.item.album.images[0].url)
                            setalbumname(response.item.album.name)
                            setartistid(response.item.artists[0].id)
                            getLyrics(response.item.name, response.item.artists[0].name)
                            currentlyPlaying = response.item.name

                        } catch (err) {
                            settitle(response.item.name)
                            setartist(response.item.artists[0].name)
                            setalbumart("https://i.pinimg.com/736x/ae/dc/45/aedc457b2cdad874b38dc69015e561ee.jpg")
                            setalbumname(response.item.album.name)
                        }
                    } else {
                        console.log("Same")
                    }
                })

        }, 7000);
    }


    const getLyrics = (song, artist) => {

        reset()
        setfunc((func) => func + 1)

        checkcache(song, artist).then((result) => {
            setLRC(result)
            for (const s of result) {
                console.log(s)
                var ind = s.match(/\[(.*?)\]/)[1]
                console.log(ind)
                var second = (Number(ind.split(':')[0]) * 60 + Number(ind.split(':')[1])) * 10;
                timestamps.push(Math.round(second))
                console.log(Math.round(second))
            }
            const id = setInterval(() => {
                setTimer((timer) => timer + 1)
                time = time + 1
                //move to another function?????
                if (timestamps.includes(time)) {
                    var line = result[timestamps.indexOf(time)]
                    line = line.replace(line.match(/\[(.*?)\]/)[0], '')
                    setcurrentLine(line)
                }
            }, 100)
            settimer2(id)
        }
        )
    }

    const reset = () => {
        setTimer(0)
        setcurrentLine('')
        clearInterval(timer2)
        settimestamps([])
        setLRC('')
    }

    useEffect(() => {
        // getNowPlaying()
        console.log("effect")

        getNowPlaying()
    }, []);


    return (
        <div>
            {!session && <>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
            </>}
            {session &&
                <>
                    {spotifyApi.setAccessToken(session.accessToken)}
                    {title}<br />
                    {currentLine}<br /> {timer} <br /> {timer2} <br /> {func} <br/>
                    <button onClick={() => signOut()}>Sign Out</button> <br />
                    <button onClick={() => reset()}>Stop</button>
                </>
            }
        </div>
    )



}

export default LyricsApp