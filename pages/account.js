import { signIn, signOut, useSession } from 'next-auth/client'
import Dock from './components/Navbar/DockBar'


const Account = () => {

    const [session, loading] = useSession()

    return (
        <>
            <div className="bg-primary min-h-75 h-auto flex" >
                <div className="m-auto">
                    {!session &&
                        <div className="w-card h-auto pb-5 bg-secondary rounded-lg pl-20 pr-20" onClick={() => signIn("spotify")}>
                        <div className="text-primary text-md pt-5 font-m-heavy text-center">
                            Sign In
                        </div>
                    </div>
                    }
                    {session &&
                        <div className="w-card h-auto pb-5 bg-secondary rounded-lg pl-20 pr-20" onClick={() => signOut()}>
                            <div className="text-primary text-md pt-5 font-m-heavy text-center">
                                Sign Out
                            </div>
                        </div>
                    }
                </div>

            </div>
            <div className="block md:hidden">
                <Dock />
            </div>
        </>
    )
}

export default Account