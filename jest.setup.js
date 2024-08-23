/* eslint-disable @typescript-eslint/no-empty-function */
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
// jest.setup.js
import { setConfig } from 'next/config';
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
// import config from './next.config';
// Make sure you can use "publicRuntimeConfig" within tests.
// eslint-disable-next-line @typescript-eslint/no-var-requires
setConfig({
  reactStrictMode: true,
  sassOptions: { includePaths: ['/Users/gibingeorge/Documents/workspace/ais/styles'] },
});
window.__VERSION__ = 'test version';
window.__GIT_VERSION__ = 'test version';
window.__BUILD_TIME__ = 1;
jest.mock('next/navigation', () => require('next-router-mock'));
