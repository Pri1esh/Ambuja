const timeout = (callback: { (): any; (): any; (): void }, delay: number | undefined) => {
  setTimeout(callback, delay);
};

export default timeout;
