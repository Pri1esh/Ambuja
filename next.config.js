/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const path = require('path');

const { DefinePlugin } = require('webpack');

const ENV_TYPE = process.env.NODE_ENV;

require('dotenv').config({ path: ENV_TYPE === 'dev' ? '.env.dev' : `.env.${ENV_TYPE}` });

const withImages = require('next-images');

// Git version
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({
  lightweightTags: true,
});

const gitVersion = (() => {
  try {
    return JSON.stringify(gitRevisionPlugin.version());
  } catch (e) {
    return JSON.stringify(require('./package.json').version);
  }
})();

const requestSecurityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Content-Security-Policy',
    value: `frame-ancestors 'self'`,
  },
];

const nextConfig = {
  publicRuntimeConfig: {
    baseImagePath: '/',
  },
  images: {
    domains: ['https://10.81.211.209/'],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    path: '/_next/image',
  },
  reactStrictMode: true,
  // https://nextjs.org/docs/basic-features/built-in-css-support#sass-support
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
  webpack: (config, { buildId }) => {
    config.plugins = config.plugins.concat([
      new DefinePlugin({
        __VERSION__: JSON.stringify(require('./package.json').version),
        __GIT_VERSION__: gitVersion,
        __BUILD_TIME__: new Date().getTime(),
        __BUILD_ID__: buildId,
        __RECAPTCHA__: process.env.NEXT_PUBLIC_RECAPTCHA,
      }),
    ]);
    // Important: return the modified config
    return config;
  },

  async redirects() {
    return [
      {
        source: '/why-us', // phase 2 page
        destination: '/404',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/blogs/category/:slugs',
        destination: '/blogs/:slugs',
      },
    ];
  },
  devIndicators: {
    buildActivity: false,
  },
};

const images = withImages();
module.exports = {
  compiler: {
    // removeConsole: true,
  },
  images,
  async headers() {
    return [
      {
        // Applied on All Routes
        source: '/(.*)',
        headers: requestSecurityHeaders,
      },
    ];
  },
  ...nextConfig,
};
