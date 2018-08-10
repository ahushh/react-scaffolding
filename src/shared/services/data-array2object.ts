import { NormalizedData } from '../models';

const keyBy = require('lodash/keyBy');

export function dataArrayToObject(data: any[], idField = 'id'): NormalizedData<any> {
  if (!Array.isArray(data)) {
    throw new Error(`Supplied data '${JSON.stringify(data)}' is not an array`);
  }
  if (data[0] && typeof data[0][idField] === 'undefined') {
    throw new Error(`Incorrect '${idField}' field for ID`);
  }
  return {
    ids: data.map(x => x[idField]),
    all: keyBy(data, idField),
  };
}

export const getListFromNormalized =
  <T extends any>(data: NormalizedData<T>): T[] => data.ids.map(id => data.all[id]);
