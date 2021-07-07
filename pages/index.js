import Navbar from './components/Navbar/Navbar'
import { signIn, useSession } from 'next-auth/client'
import { motion } from 'framer-motion'
import Dock from './components/Navbar/DockBar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faBroom, faMusic } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import SpotifyWebApi from 'spotify-web-api-js';
import { useState, useEffect } from 'react'
import Link from 'next/link'


const Home = () => {

  const [session, loading] = useSession()
  const spotifyApi = new SpotifyWebApi();

  const card1 = () => {
    return (
      <Link href="/lyrics">
        <div className="w-card h-auto bg-secondary rounded-lg flex pb-10 hover:bg-purple-100">
          <div className="pt-10 pl-5">
            <FontAwesomeIcon icon={faMusic} size="3x" color="#679D5A" />
          </div>
          <div>
            <div className="text-primary text-md pt-8 pl-8 font-m-heavy">
              Get Lyrics
            </div>
            <div className="text-primary text-xs pt-1 pl-8 pr-7">
              Instantly get lyrics for the song your listening to seemlessly
            </div>
          </div>
        </div>
      </Link>

    )
  }

  const card2 = () => {
    return (
      <Link href="/clean">
        <div className="w-card h-auto bg-secondary rounded-lg flex pb-10 hover:bg-purple-100">
          <div className="pt-12 pl-5">
            <FontAwesomeIcon icon={faBroom} size="3x" color="#679D5A" />
          </div>
          <div>
            <div className="text-primary text-md pt-8 pl-5 font-m-heavy">
              Clean Playlist
            </div>
            <div className="text-primary text-xs pt-1 pl-5 pr-2">
              Create an exact clone of your playlist with all of the explicit content removed
            </div>
          </div>
        </div>
      </Link>
    )
  }

  const profilecard = () => {

    const [pfp, setpfp] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/1024px-Solid_black.svg.png")

    useEffect(() => {
      if (!session.user.image == "") {
        setpfp(session.user.image)
      }
    }, []);

    return (
      <div className="w-card h-auto flex pb-4 " >
        <div>
          <img src={pfp} className="rounded-full h-20 w-20" />
        </div>
        <div className="text-primary text-secondary text-2xl pt-5 pl-4 font-m-heavy flex-1">
          Welcome, <div className="text-accent">{session.user.name} </div>
        </div>
      </div>
    )
  }

  const songcard = () => {

    const [songName, setsongName] = useState("Nothing")
    const [albumName, setalbumName] = useState("Nothing")
    const [artistName, setartistName] = useState("Nothing")
    const [albumart, setalbumart] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/1024px-Solid_black.svg.png")

    useEffect(() => {
      spotifyApi.getMyTopTracks().then((result) => {
        setsongName(result.items[1].name)
        setartistName(result.items[1].artists[0].name)
        setalbumName(result.items[1].album.name)
        setalbumart(result.items[1].album.images[0].url)
      })
    }, []);


    return (
      <div className="w-card h-auto pb-8 bg-secondary rounded-lg">
        <div className="text-primary text-xl pt-5 pl-2 font-m-heavy text-center">
          Your Favourite Track
        </div>
        <div className="flex">
          <div className="pt-7 pl-5">
            <img src={albumart} className="h-20 w-20" />
          </div>

          <div>
            <div className="text-primary text-md pt-8 pl-5 font-m-heavy">
              {songName}
            </div>
            <div className="text-primary text-xs pt-1 pl-5 pr-2">
              {artistName}
            </div>
            <div className="text-primary text-xs pt-1 pl-5 pr-2">
              {albumName}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const signInCard = () => {
    return (
      <div className="w-card h-auto pb-5 bg-secondary rounded-lg" onClick={() => signIn("spotify")}>
        <div className="text-primary text-md pt-5 pl-2 font-m-heavy text-center">
          Sign In
        </div>
      </div>
    )
  }


  return (

    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="bg-primary min-h-75 h-auto flex" >
        <div className="pl-6 pr-6 block md:hidden">
          {session &&
            <div className="pt-10">
              {spotifyApi.setAccessToken(session.accessToken)}
              {profilecard()}
            </div>
          }
          {!session &&
            <div className="pt-10">
              {signInCard()}
            </div>
          }
          <div className="pt-8">
            {card1()}
          </div>
          <div className="pt-8">
            {card2()}
          </div>
          {session &&
            <div className="pt-8">
              {spotifyApi.setAccessToken(session.accessToken)}
              {songcard()}
            </div>
          }
        </div>
        <div className="md:block hidden m-auto pb-32">
          <div className="text-secondary text-5xl pt-5 font-m-heavy text-center ">
            Welcome to AdLib
          </div>
          <div className="text-secondary text-1xl pt-5 font-m-heavy text-center pb-10">
            (It is recommended to install the mobile app for the best experience)
          </div>
          <div>
            {signInCard()}
          </div>
        </div>


      </div>
      <div className="block md:hidden">
        <Dock />
      </div>
    </>
  )
}

export default Home
