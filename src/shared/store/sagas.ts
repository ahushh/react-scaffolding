import { all, AllEffect, fork } from 'redux-saga/effects';
const watchers = [];

export default function* rootSaga(): IterableIterator<AllEffect> {
  yield all([
    ...watchers,
  ].map(fork));
}
