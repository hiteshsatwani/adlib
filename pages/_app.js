import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </Provider>
  )
}

export default MyApp
