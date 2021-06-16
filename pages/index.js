import Navbar from './components/Navbar/Navbar'
import { useSession } from 'next-auth/client'


const Home = () => {

  const [session, loading] = useSession()


  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default Home
