import { AxiosPromise } from 'axios';

export type FSA<P = any, M = any> = FluxStandardAction<P, M>;

export interface FluxStandardAction<P = any, M = any> {
  type: string;
  payload?: P;
  error?: boolean; // if error is true, payload should be an Error object according to FSA convention
  meta?: M;
}

interface ApiRequestMeta {
  request: (payload: any, token: any) => AxiosPromise<any>;
  success: Function;
  fail: Function;
}

export interface PreloaderMeta {
  showPreloader: boolean;
}
export type ApiRequestAction<T = any> = FluxStandardAction<T, ApiRequestMeta>;

export interface PageState {
  readonly current_page: number;
  readonly last_page: number;
  readonly per_page: number;
  readonly total: number;
}

export interface NormalizedData<T> {
  ids: any[];
  all: { [id: string]: T };
}

export const getInitialNormalizedData = <T>(): NormalizedData<T> => ({
  ids: [],
  all: {},
});

export enum EntityAction {
  store = 'store',
  update = 'update',
  destroy = 'destroy',
}

export type Partial<T> = {
  [P in keyof T]?: T[P];
};
