import spotifyApi, { LOGIN_URL } from '@/libs/spotify';

import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log('refreshed token:', refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'refresh access token error',
    };
  }
}

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENTID as string,
      clientSecret: process.env.SPOTIFY_SECRETID as string,
      authorization: LOGIN_URL,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at! * 1000,
        };
      }

      //@ts-ignore
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      //@ts-ignore
      session.user.accessToken = token.accessToken;
      //@ts-ignore
      session.user.refreshToken = token.refreshToken;
      //@ts-ignore
      session.user.username = token.username;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
