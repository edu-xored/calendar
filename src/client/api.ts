import * as Promise from 'promise';

export function fetchJSON<T>(path: string): Promise.IThenable<T> {
  // TODO fix typings
  return (window as any).fetch(path).then(res => res.json());
}
