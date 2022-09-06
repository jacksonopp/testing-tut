import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

export interface Person {
  id?: number,
  firstName?: string | null,
  lastName?: string | null
}

export interface User {
  id: number,
  name: string,
  username: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public submitPerson(firstName?: string | null, lastName?: string | null): Observable<Person> {
    if (!firstName) {
      return throwError(() => new Error('first name cannot be undefined'))
    }

    if (!lastName) {
      return throwError(() => new Error('last name cannot be undefined'))
    }

    return this.http.post<Person>('https://jsonplaceholder.typicode.com/users', {firstName, lastName})
  }
}
