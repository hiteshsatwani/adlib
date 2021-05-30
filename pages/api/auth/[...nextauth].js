import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: 'user-read-private user-read-email user-read-playback-state user-top-read user-modify-playback-state playlist-read-private'
    }),

  ],

  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token
    },

    async session(session, token) {
      // Add property to session, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  }
})

