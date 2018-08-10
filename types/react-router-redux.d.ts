import 'react-router-redux';
import { match } from 'react-router';

declare module 'react-router-redux' {
  export function createMatchSelector<State extends { router: RouterState }, Params>(path: string): (state: State) => match<Params> | null;
}
