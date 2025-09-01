/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 👇 If your app is served under /til (e.g. example.com/til)
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
