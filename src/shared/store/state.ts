import { createStore, applyMiddleware, Store, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import * as freezeMiddleware from 'redux-freeze';
import { Location } from 'history';
import ReduxThunk from 'redux-thunk';
import {
  routerReducer, routerMiddleware
} from 'react-router-redux';
import rootSaga from './sagas';
import { browserHistory } from 'shared/utils';

export interface RouterState {
  location: Location | null;
}

export interface RootState {
  router: RouterState;
}
export const rootReducers = combineReducers<RootState>({
  router: routerReducer,
});

const loggerMiddleware = createLogger({
  collapsed: true,
  diff: true,
});

const isProd = process.env.NODE_ENV === 'production';

export function configureStore(initialState?: RootState) {
  const sagaMiddleware = createSagaMiddleware();
  const router = routerMiddleware(browserHistory);
  const middlewares = [
    ReduxThunk,
    loggerMiddleware,
    router,
    sagaMiddleware,
  ];
  if (!isProd) {
    middlewares.push(freezeMiddleware);
  }

  let middleware = applyMiddleware(...middlewares);

  if (!isProd) {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(
    rootReducers,
    initialState,
    middleware
  ) as Store<RootState>;

  sagaMiddleware.run(rootSaga);
  // if (module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     const nextReducer = require('../reducers');
  //     store.replaceReducer(nextReducer);
  //   });
  // }

  return store;
}
