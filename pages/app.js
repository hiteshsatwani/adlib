import { useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js';
import { signIn, signOut, useSession } from 'next-auth/client'



const App = () => {

    const [title, settitle] = useState('Nothing Playing')
    const [artist, setartist] = useState('Nothing Playing')
    const [albumart, setalbumart] = useState("https://i.pinimg.com/736x/ae/dc/45/aedc457b2cdad874b38dc69015e561ee.jpg")
    const [albumname, setalbumname] = useState('None')
    const [artistid, setartistid] = useState('')
    const [session, loading] = useSession()


    const spotifyApi = new SpotifyWebApi();

    const getNowPlaying = () => {
        var currentlyPlaying = ''
        setInterval(() => {
            spotifyApi.getMyCurrentPlaybackState()
                .then((response) => {
                    setState({ progress: response.progress_ms })
                    console.log(state)
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

        // reset()
        // setfunc((func) => func + 1)

        checkcache(song, artist).then((result) => {
            setLRC(result)
        }
        )
    }




    useEffect(() => {
        // getNowPlaying()
        console.log("effect")
        getNowPlaying()
    }, []);

    if (session) {
        
    } else {
        return (
            <div>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        )
    }

}

export default App