import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    // 鍚敤鐜颁唬鍥剧墖鏍煎紡锛岃嚜鍔ㄤ紭鍖栦�?AVIF �?WebP
    qualities: [68, 70, 72, 74, 75],
    // 璁惧灏哄鏂偣锛岀敤浜庡搷搴斿紡鍥剧墖
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // 鍥剧墖灏哄鍙樹�?
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 鍏佽鐨勫閮ㄥ浘鐗囧煙�?
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  // 鍘嬬缉杈撳嚭
  compress: true,
};

export default nextConfig;
