/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"]
	},
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
