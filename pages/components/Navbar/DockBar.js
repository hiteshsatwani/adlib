import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faHome, faHandSparkles, faMusic, faUser, faUserSlash } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

const Dock = () => {

    const [session, loading] = useSession()

    return (
        <div className="h-screen-25 grid grid-cols-4 gap-4 bg-black text-white">
            <Link href="/">
                <div className="m-auto">
                    <FontAwesomeIcon icon={faHome} size="1x" />
                </div>
            </Link>
            <Link href="/lyrics">
                <div className="m-auto">
                    <FontAwesomeIcon icon={faMusic} size="1x" />
                </div >
            </Link>
            <Link href="/clean">
                <div className="m-auto">
                    <FontAwesomeIcon icon={faHandSparkles} size="1x" />
                </div>
            </Link>
            {session &&
                <div className="m-auto" onClick={() => signOut()}>
                    <FontAwesomeIcon icon={faUserSlash} size="1x" />
                </div>
            }
            {!session &&
                <div className="m-auto" onClick={() => signIn()}>
                    <FontAwesomeIcon icon={faUser} size="1x" />
                </div>
            }

        </div>
    )

}

export default Dock