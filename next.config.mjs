/** @type {import('next').NextConfig} */

const rewrites = async () => {
  return {
    fallback: [
      {
        source: "/:path*",
        destination: `https://tooldaily.cn/:path*`,
      },
    ],
  };
};

const nextConfig = {
  reactStrictMode: true,
  rewrites,
};

export default nextConfig;
