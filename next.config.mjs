/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    reactCompiler: {
      compilationMode: 'annotation',
    },
  },
};

export default nextConfig;
