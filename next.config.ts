/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  basePath: '/gainwellglobal',
  assetPrefix: '/gainwellglobal',

  env: {
    NEXT_PUBLIC_BASE_PATH: '/gainwellglobal',
  },

  images: {
      },

  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },

  experimental: {
    serverActions: {},
  },
};


export default nextConfig;
