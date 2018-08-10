import { FSA } from 'shared/models/index';

export const appendStatusCodeToAction = (statusCode: number, action: FSA): FSA =>
  ({ ...action, meta: { ...action.meta, statusCode } });
