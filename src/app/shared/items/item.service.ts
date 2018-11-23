import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Item } from './item';
import { environment } from '../../../environments/environment';

const SERVER_DOMAIN = environment.serverDomain;
const CACHE_SIZE = 1; // We only want the most recent values fetched from the db.

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private cache: Observable<Item[]>;

  constructor(private httpClient: HttpClient) {}

  getItems(): Observable<Item[]> {
    if (!this.cache) {
      this.cache = this.fetchItems().pipe(
        shareReplay(CACHE_SIZE)
        );
    }

    return this.cache;
  }

  private fetchItems(): Observable<Item[]> {
    return this.httpClient.get(`${SERVER_DOMAIN}/items`).pipe(map((response: Response) => response.json()));
  }

  requestItem(item: Item) {
    return this.httpClient.post(`${SERVER_DOMAIN}/items`, item).toPromise();
  }

  deleteItem(id: string) {
    return this.httpClient.delete(`${SERVER_DOMAIN}/items/${id}`).toPromise();
  }

  updateItem(item: Item) {
    return this.httpClient.post(`${SERVER_DOMAIN}/items`, item).toPromise();
  }
}
