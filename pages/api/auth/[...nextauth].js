import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'


async function refreshAccessToken(token) {
  const encodedData = Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64');

  try {
    const url =
      "https://accounts.spotify.com/api/token?" +
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + encodedData
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: 'user-read-private user-read-email user-read-playback-state user-top-read user-modify-playback-state playlist-read-private playlist-modify-public playlist-modify-private'
    }),

  ],

  callbacks: {
    // async jwt(token, user, account, profile, isNewUser) {
    //   // Add access_token to the token right after signin
    //   if (account?.accessToken) {
    //     token.accessToken = account.accessToken
    //   }
    //   return token
    // },

    // async session(session, token) {
    //   // Add property to session, like an access_token from a provider.
    //   session.accessToken = token.accessToken
    //   return session
    // }

    async jwt(token, user, account, profile, isNewUser) {
      // Initial sign in
      if (account?.accessToken) {
        token.accessToken = account.accessToken
        token.accessTokenExpires = account.expires
        token.refreshToken = account.refreshToken
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session(session, token) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    }
  }
})

