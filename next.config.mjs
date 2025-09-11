/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-assessment-biopharma.kalbe.co.id/api/v1/:path*", 
      },
    ];
  },
};

export default nextConfig;
