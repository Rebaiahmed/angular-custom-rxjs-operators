import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function handleError<T>() {
  return (source: Observable<T>) => {
    return source.pipe(
      catchError((error) => {
        console.error('An error occurred' + error);
        return of({} as never);
      })
    );
  };
}