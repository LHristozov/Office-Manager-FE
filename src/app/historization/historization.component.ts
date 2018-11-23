import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/orders/orders.service';
import { Orders } from '../shared/orders/orders';
import { WeeklySummary } from './weekly-summary';
import { Item } from '../shared/items/item';

@Component({
  selector: 'app-historization',
  templateUrl: './historization.component.html',
  styleUrls: ['./historization.component.scss']
})
export class HistorizationComponent implements OnInit {
  orders: Orders[] = [];
  weeklyVotedItems: WeeklySummary[] = [];
  currentUser: any;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.getAllOrders().then(res => {
      this.orders = res;
      this.getSummaryForTheLastMonth();
      console.log(this.weeklyVotedItems);
    });
  }

  getWeekRangeByWeekNumber(weekNo: number) {
    const date: Date = new Date();
    const numberOfDaysSinceLastMonday =  date.getDay() - 1;
    date.setDate(date.getDate() - numberOfDaysSinceLastMonday);
    const weekNoToday = this.ordersService.getWeekNumber(new Date())[1];
    const weeksInTheFuture = weekNo - weekNoToday;
    date.setDate(date.getDate() +  7 * weeksInTheFuture);
    const rangeIsFrom = date.getMonth() + 1 + '/' +  date.getDate() + '/' + date.getFullYear();
    date.setDate(date.getDate() + 6);
    const rangeIsTo = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() ;

    return rangeIsFrom + ' to ' + rangeIsTo;
  }


  getSummaryForTheLastMonth() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const currentWeek = this.ordersService.getWeekNumber(new Date())[1];
    for (let i = currentWeek - 1; i >= currentWeek - 4; i --) {
      const week = this.getWeekRangeByWeekNumber(i);
      const weeklyItems: Item[] = [];
      const filteredOrders = this.orders.filter(order =>
        this.ordersService.getWeekNumber(new Date(order.order_date))[1] === i
        && order.order_giver_id === Number(this.currentUser.id));
        filteredOrders.forEach(order => {
          weeklyItems.push(order.item);
        });
        this.weeklyVotedItems.push(new WeeklySummary(weeklyItems, week));
    }

  }

}
