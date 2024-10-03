import { createContext } from 'react';
import { reactPlugin } from './appinsightsConfiguration';

const AppInsightsContext = createContext(reactPlugin);

const AppInsightsContextProvider = (props: any) => {
  return <AppInsightsContext.Provider value={reactPlugin}>{props?.children}</AppInsightsContext.Provider>;
};

export { AppInsightsContext, AppInsightsContextProvider };
