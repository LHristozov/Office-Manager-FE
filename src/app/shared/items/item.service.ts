import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  filter: string;
  subscription: Subscription;

  constructor(private http: Http) { }

  getAll(): Observable<Item[]> {
    return this.http.get('http://localhost:8080/items').pipe(map((response: Response) => response.json()));
  }
}
