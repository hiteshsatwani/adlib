import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'next-auth/client'
import Head from 'next/head'
import Store from './store'

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Provider session={pageProps.session}>
        <AnimatePresence exitBeforeEnter>
          <div>
            <Head>
              <title>AdLib 2.0 - Spotify Utilities</title>
            </Head>
            <Component {...pageProps} />
          </div>
        </AnimatePresence>
      </Provider>
    </Store>
  )
}

export default MyApp
