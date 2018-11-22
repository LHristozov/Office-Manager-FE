import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Item } from './item';
import { environment } from '../../../environments/environment';
import { Orders } from 'src/app/Orders';

const SERVER_DOMAIN = environment.serverDomain;
const CACHE_SIZE = 1; // We only want the most recent values fetched from the db.

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private cache: Observable<Item[]>;

  constructor(private http: Http, private httpClient: HttpClient) {}

  getItems(): Observable<Item[]> {
    if (!this.cache) {
      this.cache = this.getAll().pipe(
        shareReplay(CACHE_SIZE)
        );
    }

    return this.cache;
  }

  private getAll(): Observable<Item[]> {
    return this.http
      .get(`${SERVER_DOMAIN}/items`)
      .pipe(map((response: Response) => response.json()));
  }

  getAllCached(): Observable<Item[]> {
    return this.http.get(`${SERVER_DOMAIN}/items`).pipe(map((response: Response) => response.json()));
  }

  requestItem(item: Item) {
    return this.httpClient.post(`${SERVER_DOMAIN}/items`, item).toPromise();
  }

  placeAnOrder(order: Orders) {
    return this.httpClient.post(`${SERVER_DOMAIN}/orders`, order).toPromise();
  }

  getAllOrders() {
    return this.httpClient.get(`${SERVER_DOMAIN}/orders`).toPromise();
  }

  deleteItem(id: string) {
    return this.httpClient.delete(`${SERVER_DOMAIN}/items/${id}`).toPromise();
  }

  updateItem(item: Item) {
    return this.httpClient.post(`${SERVER_DOMAIN}/items`, item).toPromise();
  }

updateOrders(orders: any) {
    debugger;
    return this.httpClient.put(`${SERVER_DOMAIN}/orders/`, orders).toPromise();
  }

  getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    let yearStart: any;
    yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
  }
}
