/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@kickstartds/base",
    "@kickstartds/blog",
    "@kickstartds/core",
    "@kickstartds/form",
    "@kickstartds/ds-agency",
  ],
};

module.exports = nextConfig;
