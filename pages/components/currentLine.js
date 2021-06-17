import { useState, useEffect, useContext } from 'react'
import { Context } from '../store'

const CurrentLine = ({ lyrics }) => {

	var time = 1500

	const [state, setState] = useContext(Context)
	const [timestamps, settimestamps] = useState([])
	const [currentLine, setcurrentLine] = useState('')
	const [linebefore, setlinebefore] = useState('')
	const [lineafter, setlineafter] = useState('')
	const [timer, setTimer] = useState(1500)
	const [intv1, setIntv1] = useState()
	var currentlyrics = []




	var currentms = 0

	useEffect(() => {
		setInterval(() => {
			if (currentlyrics.length != lyrics.length) {
				currentlyrics = lyrics
				initiate()
			}
			if (currentms < state.progress) {
				currentms = state.progress + 1
				var newtime = state.progress + 1500
				setTimer(Math.round(newtime / 100))
				time = (Math.round(newtime / 100))
			}
		}, 1000);

		console.log("refreshed")

	}, []);


	const initiate = () => {

		clearInterval(intv1)
		settimestamps([])
		setTimer(0)
		setcurrentLine('')

		for (const s of lyrics) {
			var ind = s.match(/\[(.*?)\]/)[1]
			var second = (Number(ind.split(':')[0]) * 60 + Number(ind.split(':')[1])) * 10;
			timestamps.push(Math.round(second))
		}
		const id = setInterval(() => {
			setTimer((timer) => timer + 1)
			time = time + 1
			//move to another function?????
			if (timestamps.includes(time)) {
				var line = lyrics[timestamps.indexOf(time)]
				line = line.replace(line.match(/\[(.*?)\]/)[0], '')
				setcurrentLine(line)
				var linebefore = lyrics[lyrics.indexOf(lyrics[timestamps.indexOf(time)]) - 1]

				try {
					linebefore = linebefore.replace(linebefore.match(/\[(.*?)\]/)[0], '')
					var lineafter = lyrics[lyrics.indexOf(lyrics[timestamps.indexOf(time)]) + 1]
					lineafter = lineafter.replace(lineafter.match(/\[(.*?)\]/)[0], '')
					setlineafter(lineafter)
					setlinebefore(linebefore)
				} catch(err){
					console.log(err)
				}
				
			}
		}, 100)
		setIntv1(id)

	}
	return (
		<div className="flex h-3/4">
			<div className="m-auto pl-5 pr-5 md:pl-0 md:pr-0">
				<div className="text-white text-center text-4xl text-opacity-25">
					{linebefore}<br /><br /><br />
				</div>
				<div className="text-white text-center text-4xl">
					{currentLine}<br /><br /><br />
				</div>
				<div className="text-white text-center text-4xl text-opacity-25">
					{lineafter}
				</div>
				<br />
			</div>
		</div>
	)
}

export default CurrentLine