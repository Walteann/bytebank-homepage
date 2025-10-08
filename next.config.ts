import type { NextConfig } from "next";

// const { NEXT_PUBLIC_BASE_PATH } = process.env;

const nextConfig: NextConfig = {
  basePath: `/homepage`,
  // assetPrefix: `${NEXT_PUBLIC_BASE_PATH}`,
  // output: 'standalone',
  //  async rewrites() {
  //   return {
  //     beforeFiles: [
  //       {
  //         source: `${NEXT_PUBLIC_BASE_PATH}/_next/:path+`,
  //         destination: '/_next/:path+',
  //       },
  //     ],
  //   }
  // },
};

export default nextConfig;
