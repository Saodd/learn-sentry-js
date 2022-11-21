import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { init } from '@sentry/react';
import { App } from './app';

console.log('__NPM_VERSION__', __NPM_VERSION__);

const initSentryWeb = (): void => {
  init({
    dsn: 'https://3a34decb38584dfeaa33f4944790ec2d@o406543.ingest.sentry.io/4504195042377728',
    integrations: [],
    tracesSampleRate: 1.0,
    environment: 'production',
    release: __NPM_VERSION__,
    ignoreErrors: ['ResizeObserver loop limit exceeded'],
  });
};
initSentryWeb();

let root: HTMLDivElement = document.querySelector('app-root');
if (!root) {
  root = document.createElement('div');
  document.body.appendChild(root);
}
ReactDOM.render(React.createElement(App), root);
