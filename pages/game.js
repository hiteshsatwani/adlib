import { useState, useEffect } from 'react'
import { getLyricFromSong, getRandomSong } from '../functions'
import LyricCard from './components/lyriccard'
import { motion } from 'framer-motion'
const App = () => {

    const [lyrics, setLyrics] = useState('')
    const [options, setoptions] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [showingLyrics, setshowingLyrics] = useState(true)
    const [points, setpoints] = useState(0)
    const [initialized, setInitialized] = useState(false)
    const [artist, setartist] = useState('')


    function getData(Artist) {

        getRandomSong(Artist).then((result) => {
            getLyricFromSong(Artist, result.correctoption).then((resp) => {
                setLyrics(resp)
                setTimeout(() => setshowingLyrics(false), 5000)
            })
            var answerarray = [result.correctoption, result.option1, result.option2, result.option3]
            setCorrectAnswer(result.correctoption)
            answerarray.sort(() => (Math.random() > .5) ? 1 : -1);
            setoptions(answerarray)
        })
    }

    function reload() {
        getData(artist)
        console.log("test")
    }

    function isCorrectAnswer(answer) {
        if (answer == correctAnswer) {
            setshowingLyrics(true)
            getData(artist)
            setpoints(points + 1)
            setLyrics('')
        } else {
            setpoints(0)
            setshowingLyrics(true)
            getData(artist)
            setLyrics('')
        }
    }

    const pointscard = () => {
        return (
            <div className="text-2xl text-white">
                Points : {points}
            </div>
        )
    }

    if (initialized == true) {
        if (!lyrics == '') {
            if (showingLyrics == true) {
                return (
                    <div className="bg-gray-900">
                        <div className="pt-5 pl-5">
                            {pointscard()}
                        </div>
                        <div className="bg-gray-900 flex h-screen" onClick={() => reload()}>

                            <div className="m-auto">
                                <motion.div initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 1.5 }}>
                                    <div>
                                        <LyricCard lyrics={lyrics} />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div class="bg-gray-900 h-screen">
                        <div className="pt-5 pl-5">
                            {pointscard()}
                        </div>

                        <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 1.5 }}>

                            <div class="pt-20">
                                <div className="bg-gray-900 h-80">

                                    <LyricCard lyrics={lyrics} size="s" />
                                </div>
                            </div>

                            <div class="p-5 text-white grid grid-cols-2 gap-5 text-center">
                                <div class="bg-gray-600 rounded p-10" onClick={() => isCorrectAnswer(options[0])}>{options[0]}</div>
                                <div class="bg-gray-600 rounded p-10" onClick={() => isCorrectAnswer(options[1])}>{options[1]}</div>
                                <div class="bg-gray-600 rounded p-10" onClick={() => isCorrectAnswer(options[2])}>{options[2]}</div>
                                <div class="bg-gray-600 rounded p-10" onClick={() => isCorrectAnswer(options[3])}>{options[3]}</div>
                            </div>
                        </motion.div>
                    </div>
                )
            }

        } else {
            if (showingLyrics == true) {
                return (
                    <div className="bg-gray-900">
                        <div className="pt-5 pl-5">
                            {pointscard()}
                        </div>
                        <div className="bg-gray-900 flex h-screen">

                            <motion.div initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 1.5 }} className="m-auto">

                                <div className="text-white text-center text-3xl">
                                    Loading...
                    </div>
                            </motion.div>

                        </div >
                    </div>
                )
            } else {
                return (
                    <div>
                        render next component
                    </div>
                )
            }
        }
    } else {
        return (
            <div class="bg-gray-900 h-screen flex">
                <div className="m-auto">
                    <h1 className="text-white text-center text-3xl pb-10">
                        Enter Your Artist
                    </h1>
                    <input type="text" placeholder="Artist Name" onChange={e => setartist(e.target.value)} class="text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full" />
                    <div className="pt-10">
                        <a href="#" onClick={() => {
                            setInitialized(true)
                            getData(artist)
                        }} class="bg-purple-600 hover:bg-purple-500 py-3 px-28 rounded text-red-100 transition duration-300">Next</a>
                    </div>
                </div>
            </div>
        )
    }




}


export default App