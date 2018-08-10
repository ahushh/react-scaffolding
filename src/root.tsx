import * as React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { Provider, connect } from 'react-redux';

import { userIsNotAuthenticatedRedir } from 'auth';

const Auth = () => <div>auth component</div>;

const AuthComponent: any = withRouter(userIsNotAuthenticatedRedir(Auth) as any);

export const Root = ({ history, store }) => {
  const redirectToLogin = () => <Redirect to='/auth/login' />;
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact={true} path='/' render={redirectToLogin} />
          <AuthComponent path='/auth'>
            <Switch>
              {/* <Route path='/auth/login' component={Login} />
              <Route path='/auth/register' component={Register} />
              <Route path='*' component={NotFound} /> */}
            </Switch>
          </AuthComponent>

        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};
