import $ from "jquery"
import firebase from 'firebase/app';
import "firebase/firestore";


export async function checkcache(song, artist) {
	const db = firebase.firestore()

	song = song.replace(/ *\([^)]*\) */g, ""); 

	var docRef = db.collection("CachedLyrics").doc(song + " + " + artist);
	return docRef.get().then((doc) => {
		if (doc.exists) {
			var data = doc.data().lyrics.split('\n')
			return data
		} else {
			console.log("ok1")
			const data = fetch('https://us-central1-lyrics-api-b7dfc.cloudfunctions.net/pygetLyrics?artist=' + artist + "&track=" + song).then(function (response) {
				return response.text();
			}).then(function (string) {
				if (string != "None") {
					docRef.set({ lyrics: string })
				}
				var data = string.split('\n')
				console.log(data)
				return data
			})
			return data
		}
	}).catch((error) => {
		console.log("Error getting document:", error);
	});
}


export async function getLyricFromSong(artist, song) {

	const data = fetch('https://us-central1-lyrics-api-b7dfc.cloudfunctions.net/getLyrics?artist=' + artist + '&song=' + song, { method: 'no-cors' }).then(function (response) {
		return response.text();
	}).then(function (string) {
		const array = string.split('\n')
		const randomint = getRandomInt(array.length)
		const randomstring = array[randomint] + "\n" + array[randomint + 1] + "\n" + array[randomint + 2] + "\n" + array[randomint + 3]
		return randomstring

	});
	return data
}

export async function getRandomSong(artist) {

	const data = fetch('https://us-central1-lyrics-api-b7dfc.cloudfunctions.net/getSongs?artist=' + artist).then(function (response) {
		return response.text();
	}).then(function (string) {

		var jsondata = JSON.parse(string)
		console.log(jsondata.correctoption)
		return jsondata
	});


	return data

}



export function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
