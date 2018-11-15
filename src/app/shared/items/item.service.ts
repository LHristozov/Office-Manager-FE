import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from './item';
import { environment } from '../../../environments/environment';
import { Orders } from 'src/app/Orders';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  filter: string;
  subscription: Subscription;

  constructor(private http: Http, private httpClient: HttpClient) { }

  getAll(): Observable<Item[]> {
    return this.http.get(`${SERVER_DOMAIN}/items`).pipe(map((response: Response) => response.json()));
  }

  placeAnOrder(order: Orders) {
    return this.httpClient.post(`${SERVER_DOMAIN}/orders`, order).toPromise();
  }

  getAllOrders() {
  return this.httpClient.get(`${SERVER_DOMAIN}/orders`).toPromise();
  }
}
