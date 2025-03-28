import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pokeapi.co',
      },
    ],
  },
  /* config options here */
}

export default nextConfig
