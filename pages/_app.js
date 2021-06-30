import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'next-auth/client'
import Head from 'next/head'
import Store from './store'
import Navbar from './components/Navbar/Navbar'
import Dock from './components/Navbar/DockBar'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above


function MyApp({ Component, pageProps }) {
  switch (Component.name) {
    case "LyricsApp":
      return (
        <Store>
          <Provider session={pageProps.session}>
            <AnimatePresence exitBeforeEnter>
              <div>
                <Head>
                  <title>AdLib 2.0 - Spotify Utilities</title>

                  <meta charset='utf-8' />
                  <meta http-equiv='X-UA-Compatible' content='IE=edge' />
                  <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                  <meta name='description' content='Description' />
                  <meta name='keywords' content='Keywords' />

                  <link rel="manifest" href="/manifest.json" />
                  <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
                  <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
                  <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                  <meta name="theme-color" content="#317EFB" />
                </Head>
                <Component {...pageProps} />
              </div>
            </AnimatePresence>
          </Provider>
        </Store>
      )

    default:
      return (
        <Store>
          <Provider session={pageProps.session}>
            <AnimatePresence exitBeforeEnter>
              <div>
                <Head>
                  <title>AdLib 2.0 - Spotify Utilities</title>

                  <meta charset='utf-8' />
                  <meta http-equiv='X-UA-Compatible' content='IE=edge' />
                  <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                  <meta name='description' content='Description' />
                  <meta name='keywords' content='Keywords' />

                  <link rel="manifest" href="/manifest.json" />
                  <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
                  <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
                  <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                  <meta name="theme-color" content="#317EFB" />
                </Head>
                <div className="hidden md:block">
                  <Navbar />
                </div>
                <Component {...pageProps} />
                <div className="block md:hidden">
                  <Dock />
                </div>
              </div>
            </AnimatePresence>
          </Provider>
        </Store>
      )

  }
}

export default MyApp
