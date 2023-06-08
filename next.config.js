/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'charts-images.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'mixed-media-images.spotifycdn.com',
      },
      {
        protocol: 'https',
        hostname: 'thisis-images.scdn.co',
      },
    ],
  },
}

module.exports = nextConfig
