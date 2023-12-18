import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>('http://localhost:3000/customers');
  }

  create(payload: Customer) {
    return this.httpClient.post<Customer>(
      'http://localhost:3000/customers',
      payload
    );
  }

  getById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(
      `http://localhost:3000/customers/${id}`
    );
  }

  update(payload: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(
      `http://localhost:3000/customers/${payload.id}`,
      payload
    );
  }

  delete(id: number) {
    return this.httpClient.delete(`http://localhost:3000/customers/${id}`);
  }
  isLoggedIn() {
    return localStorage.getItem('isLoggedIn');
  }
  setLogggedIn(login) {
    localStorage.setItem('isLoggedIn', login);
  }
}
