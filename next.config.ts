/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  basePath: '',
  assetPrefix: '',

  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },

  images: {
    domains: ["images.unsplash.com"],
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
