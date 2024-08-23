interface Window {
  google: {
    translate: {
      TranslateElement: new (options: any, id: string) => any;
    };
  };
  googleTranslateElementInit?: () => void;
}
