import SpotifyWebApi from 'spotify-web-api-js';
import sortBy from "lodash/sortBy";
import { getStoredUserData } from './databaseServices';


const spotifyApi = new SpotifyWebApi();

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const getdata1 = async (accessToken) => {
    spotifyApi.setAccessToken(accessToken)

    var tracknames = []
    var trackbg = []
    var trackids = []
    var artistnames = []
    var artistimages = []
    var finalaudiolinks = []
    var tracklinks = []

    var noprevs = []
    var noprevstracks = []

    var artistobjects = []

    var finalarr = []
    var username = ''

    return spotifyApi.getMyTopArtists().then((result) => {
        var artists = []
        var genres = []
        for (const i in result.items) {
            artists.push(result.items[i].id)
        }
        for (const i in result.items) {
            for (const e in result.items[i].genres) {
                genres.push(result.items[i].genres[e])
            }
        }

        genres = genres.filter((item, index) => genres.indexOf(item) === index);

        artists = artists.slice(0, 3)

        var shuffledgenres = genres.sort(() => 0.5 - Math.random());
        shuffledgenres = shuffledgenres.slice(0, 2);

        return spotifyApi.getRecommendations({ seed_artists: artists, seed_genres: shuffledgenres, limit: 20 }).then((result) => {
            var artists = []
            for (const i in result.tracks) {
                artists.push(result.tracks[i].artists[0].id)
                var newid = parseInt(i)
                artistnames.push({
                    id: newid,
                    data: result.tracks[i].artists[0].name,
                })
                tracknames.push({
                    id: newid,
                    data: result.tracks[i].name,
                })
                trackbg.push({
                    id: newid,
                    data: result.tracks[i].album.images[0].url,
                })
                trackids.push({
                    id: newid,
                    data: result.tracks[i].id,
                })
                tracklinks.push({
                    id: newid,
                    data: result.tracks[i].external_urls.spotify
                })
                // setaudiolink(audiolink => [...audiolink, result.tracks[i].preview_url])
                if (result.tracks[i].preview_url == null) {
                    // spotifyApi.getTrack(result.tracks[i].id).then((result) => {

                    //     setaudiolink(audiolink => [...audiolink,
                    //     {
                    //         id: i,
                    //         data: result.preview_url,
                    //     }])

                    // })
                    noprevs.push({
                        id: newid,
                        trackid: result.tracks[i].id
                    })
                } else {

                    finalaudiolinks.push({
                        id: newid,
                        data: result.tracks[i].preview_url,
                    })

                }
            }

            for (const i in noprevs) {
                noprevstracks.push(noprevs[i].trackid)
            }

            spotifyApi.getMe().then((result) => {
                username = result.id
            })

            return spotifyApi.getArtists(artists).then((result) => {
                for (const i in result.artists) {
                    var newids = parseInt(i)
                    artistobjects.push({
                        id: newids,
                        data: result.artists[i]
                    })
                    artistimages.push({
                        id: newids,
                        data: result.artists[i].images[0].url,
                    })
                }
                return spotifyApi.getTracks(noprevstracks).then((result) => {
                    for (const i in result.tracks) {
                        finalaudiolinks.push({
                            id: noprevs.find(noprevs => noprevs['trackid'] === result.tracks[i].id).id,
                            data: result.tracks[i].preview_url,
                        })
                    }
                    var temparray = sortBy(finalaudiolinks, "id")
                    for (const i in temparray) {
                        if (temparray[i].data != null) {
                            var jsobjfinal = {
                                id: uuidv4(),
                                trackname: tracknames[i].data,
                                trackid: trackids[i].data,
                                trackbg: trackbg[i].data,
                                artistname: artistnames[i].data,
                                artistimg: artistimages[i].data,
                                tracklink: temparray[i].data,
                                trackhref: tracklinks[i].data,
                                userid: username,
                                artistObj: artistobjects[i].data,
                                provider: 'spotify'
                            }
                            finalarr.push(jsobjfinal)
                        }
                    }
                    return finalarr
                })
            })
        })

    })
}

const getdata2 = async (likedtracks, provider, accessToken) => {

    spotifyApi.setAccessToken(accessToken)


    var artistids = []
    var genres = []

    var tracknames = []
    var trackbg = []
    var trackids = []
    var artistnames = []
    var artistimages = []
    var finalaudiolinks = []
    var tracklinks = []
    var artistobjects = []

    var noprevs = []
    var noprevstracks = []

    var finalobj = []


    var username = ""



    return spotifyApi.getTracks(likedtracks).then((result) => {


        for (const i in result.tracks) {
            artistids.push(result.tracks[i].artists[0].id)
        }

        return spotifyApi.getArtists(artistids).then((result) => {
            for (const i in result.artists) {
                genres.push(result.artists[i].genres)

            }

            genres = genres.flat()

            genres = genres.filter((item, index) => genres.indexOf(item) === index);


            var shuffledgenres = genres.sort(() => 0.5 - Math.random());

            shuffledgenres = shuffledgenres.slice(0, 2);

            artistids = artistids.filter((item, index) => artistids.indexOf(item) === index);

            artistids = artistids.sort(() => 0.5 - Math.random());

            artistids = artistids.slice(0, 3)



            return spotifyApi.getRecommendations({ seed_artists: artistids, seed_genres: shuffledgenres, limit: 20 }).then((result) => {
                var artists = []
                for (const i in result.tracks) {
                    artists.push(result.tracks[i].artists[0].id)
                    var newid = parseInt(i)
                    artistnames.push({
                        id: newid,
                        data: result.tracks[i].artists[0].name,
                    })
                    tracknames.push({
                        id: newid,
                        data: result.tracks[i].name,
                    })
                    trackbg.push({
                        id: newid,
                        data: result.tracks[i].album.images[0].url,
                    })
                    trackids.push({
                        id: newid,
                        data: result.tracks[i].id,
                    })
                    tracklinks.push({
                        id: newid,
                        data: result.tracks[i].external_urls.spotify
                    })
                    // setaudiolink(audiolink => [...audiolink, result.tracks[i].preview_url])
                    if (result.tracks[i].preview_url == null) {
                        // spotifyApi.getTrack(result.tracks[i].id).then((result) => {

                        //     setaudiolink(audiolink => [...audiolink,
                        //     {
                        //         id: i,
                        //         data: result.preview_url,
                        //     }])

                        // })
                        noprevs.push({
                            id: newid,
                            trackid: result.tracks[i].id
                        })
                    } else {

                        finalaudiolinks.push({
                            id: newid,
                            data: result.tracks[i].preview_url,
                        })

                    }
                }

                for (const i in noprevs) {
                    noprevstracks.push(noprevs[i].trackid)
                }

                spotifyApi.getMe().then((result) => {
                    username = result.id
                })



                return spotifyApi.getArtists(artists).then((result) => {
                    for (const i in result.artists) {
                        var newids = parseInt(i)
                        artistobjects.push({
                            id: newids,
                            data: result.artists[i]
                        })
                        artistimages.push({
                            id: newids,
                            data: result.artists[i].images[0].url,
                        })
                    }
                    return spotifyApi.getTracks(noprevstracks).then((result) => {
                        for (const i in result.tracks) {
                            finalaudiolinks.push({
                                id: noprevs.find(noprevs => noprevs['trackid'] === result.tracks[i].id).id,
                                data: result.tracks[i].preview_url,
                            })
                        }
                        var temparray = sortBy(finalaudiolinks, "id")
                        for (const i in temparray) {
                            if (temparray[i].data != null) {
                                var jsobjfinal = {
                                    id: uuidv4(),
                                    trackname: tracknames[i].data,
                                    trackid: trackids[i].data,
                                    trackbg: trackbg[i].data,
                                    artistname: artistnames[i].data,
                                    artistimg: artistimages[i].data,
                                    tracklink: temparray[i].data,
                                    trackhref: tracklinks[i].data,
                                    userid: username,
                                    artistObj: artistobjects[i],
                                    provider: provider
                                }
                                finalobj.push(jsobjfinal)

                            }
                        }
                        return finalobj
                    })
                })
            })

        })
    })

}


export const getDataSpotify = async (accessToken) => {
    spotifyApi.setAccessToken(accessToken)

    return spotifyApi.getMe().then((result) => {
        return getStoredUserData(result.id, "spotify").then((result2) => {
            if (result2.liked.length > 10) {
                return getdata2(result2.liked, 'spotify', accessToken).then((result) => { return result })
            } else {
                return getdata1(accessToken).then((result) => { return result })
            }
        })
    })
}