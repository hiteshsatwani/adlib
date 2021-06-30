import SpotifyWebApi from 'spotify-web-api-js';
import { signIn, signOut, useSession } from 'next-auth/client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'


const Clean = () => {

    const [session, loading] = useSession()
    const [data, setdata] = useState()
    const [playlist, setPlaylist] = useState()
    const [playlistids, setplaylistids] = useState([])
    const [albumarts, setalbumarts] = useState([])
    const [playlistname, setplaylistname] = useState([])

    const spotifyApi = new SpotifyWebApi();


    useEffect(() => {
        if (session?.error) {
            signIn(); // Force sign in to hopefully resolve error
        }
    }, [session]);

    const getPlaylists = () => {
        console.log(true)
        spotifyApi
            .getUserPlaylists() // note that we don't pass a user id
            .then(
                function (data) {
                    var notadd = []
                    for (const obj of data.items) {
                        if (obj.name.includes("Clean")) {
                            notadd.push(obj.name.replace(" Clean", ""))
                        } else {
                            if (!notadd.includes(obj.name)) {
                                console.log(obj.name)
                                setplaylistids(playlistids => [...playlistids, obj.id]);
                                setplaylistname(playlistname => [...playlistname, obj.name]);
                                setalbumarts(albumarts => [...albumarts, obj.images[0].url]);
                            }
                        }
                    }
                },
                function (err) {
                    setdata(err)
                }
            );
    }

    const createandpush = (changedName, cleanURI) => {
        spotifyApi.getMe().then(function (data) {
            console.log(data)
            const useruri = data.id
            spotifyApi.createPlaylist(useruri, {
                name: changedName,
                description: "A Clean Playlist Created By Adlib",
                public: false
            }).then(function () {
                spotifyApi.getUserPlaylists().then(function (data) {
                    for (const obj of data.items) {
                        if (obj.name == changedName) {
                            cleanURI = cleanURI.filter(function (element) {
                                return element !== undefined;
                            });
                            spotifyApi.addTracksToPlaylist(obj.id, cleanURI)
                        }
                    }
                })
            })
        })
    }





    const clean = (playlistid, playlistName) => {
        const changedName = playlistName + " Clean"
        spotifyApi.getPlaylistTracks(playlistid, { limit: 100 }).then(
            function (data2) {
                var cleanURI = []
                var notracks = 0
                for (const obj of data2.items) {
                    getClean(obj.track.name, obj.track.artists[0].name).then((result) => cleanURI.push(result))
                    notracks += 1
                }
                if (data2.next != null) {
                    spotifyApi.getPlaylistTracks(playlistid, { limit: 100, offset: 100 }).then(function (data3) {
                        for (const obj of data3.items) {
                            getClean(obj.track.name, obj.track.artists[0].name).then((result) => cleanURI.push(result))
                            notracks += 1
                        }
                        createandpush(changedName, cleanURI)

                    })
                } else {
                    console.log()
                    createandpush(changedName, cleanURI)
                }

                console.log(notracks)
            }
        )
    }


    const getClean = (trackname, artist) => {
        return spotifyApi.searchTracks(trackname, { "limit": 50 })
            .then(function (data) {
                var final
                for (const obj of data.tracks.items) {
                    if (obj.explicit == false) {
                        if (trackname == obj.name && artist == obj.artists[0].name) {
                            return obj.uri
                        }
                    }
                }

            })
    }



    if (session) {

        return (
            <div>
                <div>
                    <>
                        {spotifyApi.setAccessToken(session.accessToken)}
                        <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-500 min-h-75 m-h-auto">
                            <motion.div initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 1.5 }} className="m-auto">
                                <div className="text-white text-center text-4xl pt-20">
                                    Select A Playlist
                                </div>
                                <div className="text-white text-center text-1xl pt-5">
                                    Only playlists upto 200 tracks are currently supported!
                                </div>
                                <div className="md:p-20 p-5 pt-20">
                                    <div class="grid md:grid-cols-5 md:gap-10 grid-cols-2 gap-3">
                                        {Object.keys(playlistname).map(key => {
                                            return (
                                                <div key={playlistname[key]} class="">

                                                    <div className="bg-blue-900 rounded-md">
                                                        <img src={albumarts[key]} className="m-auto pt-10" width="150px" height="150px">
                                                        </img>

                                                        <div className="text-white text-center text-1xl pt-10 pb-5">
                                                            {playlistname[key]}
                                                        </div>
                                                        <div className="flex pb-5">
                                                            <a href='#' onClick={() => clean(playlistids[key], playlistname[key])} class="bg-purple-600 hover:bg-purple-800 py-2 px-6 rounded-full transition duration-500 text-purple-100 m-auto">Clean</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                {playlistids.length == 0 &&
                                    <div className="flex pt-10">
                                        <a
                                            onClick={() => getPlaylists()}
                                            href='#'
                                            className="m-auto whitespace-nowrap items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Load Playlists
                                        </a>
                                    </div>
                                }

                            </motion.div>
                        </div>
                    </>
                </div>
            </div>

        )
    } else {
        return (
            <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-500 min-h-75 m-h-auto">

                <div className="m-auto">
                    <div className="text-white text-center text-4xl pt-20">
                        Please Sign In
                    </div>
                </div>
            </div>

        )
    }




}

export default Clean