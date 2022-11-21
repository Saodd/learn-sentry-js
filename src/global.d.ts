declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}
declare module '*.json' {
  const content: { [className: string]: string };
  export = content;
}

declare const __NPM_VERSION__: string;
