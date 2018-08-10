import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { replace } from 'react-router-redux';

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => Boolean(state.auth.token && state.auth.token.access_token),
};
export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults);
export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath: `/auth/login`,
  redirectAction: replace('/auth/login') as any,
});

const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state => !(state.auth.token && state.auth.token.access_token),
};


export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);
export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: `/init-account`,
  redirectAction: replace(`/init-account`) as any,
  allowRedirectBack: false
});
