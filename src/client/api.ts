export function fetchJSON<T>(path: string): Promise<T> {
  // TODO fix typings
  return (window as any).fetch(path).then(res => res.json());
}
