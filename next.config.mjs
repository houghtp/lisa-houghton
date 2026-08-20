/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/journal',
        destination: '/newsletter',
        permanent: true,
      },
      {
        source: '/journal/:slug*',
        destination: '/newsletter',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
