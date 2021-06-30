import Navbar from './components/Navbar/Navbar'
import { useSession } from 'next-auth/client'
import { motion } from 'framer-motion'
import Dock from './components/Navbar/DockBar'

const Home = () => {

  const [session, loading] = useSession()


  return (
    // <div class="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-500 ...">
    //   <Navbar />
    //   <div className="flex h-96 ">
    //     <div className="text-center text-3xl text-white m-auto" >
    //       Welcome To The Beta
    //     </div>
    //     <div className="text-center text-2xl text-white m-auto">
    //       dm me on ig to fix any bugs u find
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-500 h-screen-75 m-h-auto flex" >
        <motion.div initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5 }} className="m-auto pl-10 pr-10">
          <div className="text-white text-center text-4xl">
            Welcome To The Beta
          </div>
          <div className="text-white text-center text-1xl pt-5">
            I recommend installing it for the best experience
          </div>
          <div className="text-white text-center text-1xl pt-1">
            Login with the last button in the dock for mobile
          </div>
          <div className="text-white text-center text-1xl pt-1">
            dm me on ig to fix any bugs u find @hitexhs
          </div>
        </motion.div>
      </div>
      <div className="block md:hidden">
        <Dock />
      </div>
    </>
  )
}

export default Home
