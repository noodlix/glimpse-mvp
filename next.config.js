/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["*", "lh3.googleusercontent.com", "vercel.com", "i.natgeofe.com", "oaidalleapiprodscus.blob.core.windows.net"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3000/api/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
