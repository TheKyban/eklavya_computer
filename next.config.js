/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "cyiuhsy2mp34eiga.public.blob.vercel-storage.com",
                protocol: "https",
            },
            {
                hostname: "res.cloudinary.com",
                protocol: "https",
            },
        ],
    },
};

module.exports = nextConfig;
