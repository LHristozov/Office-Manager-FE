import { Injectable } from '@angular/core';
import { Orders } from './orders';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  constructor(private httpClient: HttpClient) { }
  placeAnOrder(order: Orders) {
    return this.httpClient.post(`${SERVER_DOMAIN}/orders`, order).toPromise();
  }

  getAllOrders() {
    return this.httpClient.get<Orders[]>(`${SERVER_DOMAIN}/orders`).toPromise<Orders[]>();
  }

  updateOrders(orders: any) {
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
