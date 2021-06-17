import Navbar from './components/Navbar/Navbar'
import { useSession } from 'next-auth/client'
import { motion } from 'framer-motion'


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
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-500 min-h-screen h-auto m-h-auto" >
      <Navbar />
      <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 1.5 }} className="m-auto">
        <div className="text-white text-center text-4xl pt-20">
        Welcome To The Beta
        </div>
        <div className="text-white text-center text-1xl pt-5">
        dm me on ig to fix any bugs u find @hitexhs
        </div>
      </motion.div>
    </div>
  )
}

export default Home
