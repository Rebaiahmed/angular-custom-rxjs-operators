// custom-rxjs-toast-message.ts
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

// function that displays the toast message
function showToastMessage(_snackBar: MatSnackBar,message: string): void {
  // display the message using your preferred toast library
  _snackBar.open(message);
}

// custom operator that displays a toast message when the source Observable emits a value
export function successToastMessage<T>(_snackBar: MatSnackBar,message: string) {
  return (source: Observable<T>) =>
    source.pipe(
      tap(() => {
        showToastMessage(_snackBar,message);
      })
    );
}