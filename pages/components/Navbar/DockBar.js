import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faHome, faHandSparkles, faMusic, faUser, faUserSlash, faBroom } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useState, useEffect } from 'react'

const Dock = () => {

    const [session, loading] = useSession()

    const renderpfp = () => {

        const [pfp, setpfp] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/1024px-Solid_black.svg.png")

        useEffect(() => {
            if (!session.user.image == "") {
                setpfp(session.user.image)
            }
        }, []);

        return (
            <div className="m-auto" >
                <img src={pfp} className="rounded-full h-7 w-7" />
            </div>
        )
    }

    return (
        <div className="h-screen-25 bg-purple-200 grid grid-cols-4 gap-4 text-white">
            <Link href="/">
                <div className="m-auto">
                    <FontAwesomeIcon icon={faHome} size="1x" color="#3C366B" />
                </div>
            </Link>
            <Link href="/lyrics">
                <div className="m-auto">
                    <FontAwesomeIcon icon={faMusic} size="1x" color="#3C366B" />
                </div >
            </Link>
            <Link href="/clean">
                <div className="m-auto">
                    <FontAwesomeIcon icon={faBroom} size="1x" color="#3C366B" />
                </div >
            </Link>
            {session &&
                <Link href="/account">
                    {renderpfp()}
                </Link>
            }
            {!session &&
                <Link href="/account">
                    <div className="m-auto">
                        <FontAwesomeIcon icon={faUser} size="1x" color="#3C366B" />
                    </div>
                </Link>
            }

        </div>
    )

}

export default Dock