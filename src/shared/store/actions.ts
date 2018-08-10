import { ApiRequestAction, FSA } from '../models';

export const API_REQUEST = 'API_REQUEST';

export const apiRequest = (request, payload, success, fail): ApiRequestAction => ({
  type: API_REQUEST, payload, meta: { request, success, fail }
});
