import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const defaultHistory = {
  url: '/',
  location: { pathname: '' },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  listen: () => {},
};

let browserHistory: any = defaultHistory;

if (typeof window !== 'undefined') {
  browserHistory = { ...browserHistory, ...window.history };
  browserHistory.location.pathname = browserHistory?.state?.url;
}

const reactPlugin: any = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.NEXT_PUBLIC_INSTRUMENTATION_KEY,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory },
    },
  },
});

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_INSTRUMENTATION_KEY) {
  appInsights.loadAppInsights();
}

const ComponentProvider = (Component: any) => withAITracking(reactPlugin, Component);

export { appInsights, reactPlugin };
export default ComponentProvider;
