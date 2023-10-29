/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    storyblokApiToken: process.env.STORYBLOK_API_TOKEN,
    storyblokSpaceId: process.env.STORYBLOK_SPACE_ID,
  },
};

module.exports = nextConfig;
