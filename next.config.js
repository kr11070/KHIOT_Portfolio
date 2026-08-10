/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Firebase는 브라우저에서만 쓰는데, 빌드 트레이싱이 Node용 gRPC 구현체(무거운
  // 파일이 아주 많음)까지 훑느라 Vercel 빌드가 느려지거나 멈추는 것처럼 보여서 제외.
  experimental: {
    outputFileTracingExcludes: {
      "*": [
        "node_modules/@grpc/grpc-js/**",
        "node_modules/protobufjs/**",
        "node_modules/@firebase/firestore/dist/index.node.mjs",
      ],
    },
  },
};

module.exports = nextConfig;
