/* eslint-disable no-console */
const buildVersioinWarning = (__VERSION__: string, __GIT_VERSION__: string, __BUILD_TIME__: number) => {
  console.log(`%cVersion: ${__VERSION__}`, 'font-size: 2rem');
  console.log(`Build: ${__GIT_VERSION__}/${__BUILD_TIME__}`);
  console.log('%c Warning! ', 'font-size:1.5rem;background: yellow; color:red');
  console.log(
    '%cThis is a browser feature intended for developers. Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS. Do not enter or paste code that you do not understand.',
    'font-size: 1.2rem',
  );
};

export { buildVersioinWarning };
