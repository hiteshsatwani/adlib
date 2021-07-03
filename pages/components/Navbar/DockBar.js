import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faHome, faHandSparkles, faMusic, faUser, faUserSlash, faBroom } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

const Dock = () => {

    const [session, loading] = useSession()

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
                    <div className="m-auto" >
                        <img src={session.user.image} className="rounded-full h-7 w-7" />
                    </div>
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