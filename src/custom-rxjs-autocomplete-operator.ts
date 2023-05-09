import { debounceTime, distinctUntilChanged, filter, Observable, of, OperatorFunction, switchMap, tap } from "rxjs";

export function autoCompleteSearch<T>(
  debounceMilliseconds: number,
  minLength: number,
  searchFn: (term: string) => Observable<string[]>
  ): OperatorFunction<string,string[]> {
  return (source$) =>
  source$.pipe(
  tap(console.log),
  debounceTime(debounceMilliseconds),
  distinctUntilChanged(),
  filter((value:string) => value !== undefined && value !== null && value.length> minLength),
  switchMap((searchTerm:string) => {
    return searchFn(searchTerm);
  })
  );
  }