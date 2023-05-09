// custom-rxjs-toast-message.ts
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
// function that displays the toast message
function showToastMessage(message: string): void {
  // display the message using your preferred toast library
  this.toastr.success('Hello world!', 'Toastr fun!');
}

// custom operator that displays a toast message when the source Observable emits a value
export function successToastMessage<T>(toastr: ToastrService,message: string) {
  return (source: Observable<T>) =>
    source.pipe(
      tap(() => {
        showToastMessage(message);
      })
    );
}