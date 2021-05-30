

const LyricCard = ({ lyrics = null, size }) => {

    console.log("rendered")


    if (lyrics != null) {
        if (size = 's') {
            return (
                <div className='text-white text-center m-auto text-2xl'>
                    {lyrics.split('\n').map((item, i) => (
                        <div>
                            <p key={i}>{item}</p>
                            <br />
                        </div>
                    ))}

                </div>
            )

        } else if (size = 'l') {
            return (
                <div className='text-white text-center m-auto text-3xl'>
                    {lyrics.split('\n').map((item, i) => (
                        <div>
                            <p key={i}>{item}</p>
                            <br />
                        </div>
                    ))}

                </div>
            )
        }

    } else {
        return null
    }



}

export default LyricCard