import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { fromEvent, map, Observable, of, throwError } from 'rxjs';
import { handleError } from './custom-rxjs-operator';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { autoCompleteSearch } from './custom-rxjs-autocomplete-operator';
import { ajax } from 'rxjs/ajax';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { successToastMessage } from './custom-rxjs-toast-message';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

function searchAPI(searchTerm: string): Observable<any> {
  const url = `https://dummyjson.com/products/search?q=${searchTerm}`;

  return ajax.getJSON(url);
}
@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatSnackBarModule],
  providers: [
  ],
  template: `
    <h1>Hello</h1>
    <input type="text" id="search" placeholder="search">
  `,
})
export class App {
  name = 'Angular';
  data$: Observable<any>;
  anotherData$:Observable<any>;

  // listen to our input changes and use our defined custom operator
  ngOnInit() {
    const searchBox = document.getElementById('search');
    fromEvent(searchBox, 'input').pipe(
 // map the input event to get only the input text value 
     map((event: Event) => (event.target as HTMLInputElement).value),
// call our custom rxjs operator 
      autoCompleteSearch(300,0,searchAPI)
   ).subscribe((results)=>{
 // you can see the attached screenshot to see results
     console.log('results',results)
   })

  this.fecthData1()
   this.fecthData2()
  }

  constructor(private http: HttpClient,private _snackBar: MatSnackBar) {
     this.data$ = throwError(new Error('An error occurred')).pipe(
      handleError()
    );
    this.data$.subscribe();

    this.anotherData$ = of({ name: 'John', age: 30 }).pipe(
      handleError()
    );
    this.anotherData$.subscribe();
  }

  fecthData1() {
    this.http.get('https://dummyjson.com/users').pipe(
      successToastMessage(this.toastr,'Fetching users is  successful!')
    ).subscribe();
  }

  fecthData2() {
    this.http.get('https://dummyjson.com/products').pipe(
      successToastMessage(this.toastr,'Operation fetching products is successful!')
    ).subscribe();
  }
}

bootstrapApplication(App);
