import {withAuth} from 'next-auth/middleware';

//protecting specific paths and will redirect to login if not authenticated
export default withAuth({
  pages: {
    signIn: '/api/auth/signin',
  },
});

export const config = { matcher: ["/home/:path*"] }
