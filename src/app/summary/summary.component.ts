import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/items/item.service';
import { Orders } from '../shared/orders/orders';
import { Item } from '../shared/items/item';
import { OrdersService } from '../shared/orders/orders.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  orders: Orders[];
  currentUserOrders: Orders[] = [];
  mappedItem = new Map<any, any>();
  allOrders: Orders[] = [];
  ordersToBeUpdated: Orders[] = new Array<Orders>();
  currentUser: any;
  isAdmin = false;
  items: Item[];
  itemArray: Item[] = [];
  model: any;
  curentWeekOrders: Orders[];
  hasItems = false;

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.userName === 'hristina') {
      this.isAdmin = true;
    }
    this.ordersService.getAllOrders().then(res => {
      this.orders = res;

      this.curentWeekOrders = this.orders.filter(item => {
        const orderDate = this.ordersService.getWeekNumber(new Date());
        const curDate = this.ordersService.getWeekNumber(
          new Date(item.order_date)
        );

        return orderDate[0] === curDate[0] && orderDate[1] === curDate[1];
      });
      if (!this.isAdmin) {
        this.curentWeekOrders = this.curentWeekOrders.filter(item => {
          return item.order_giver_id === Number(this.currentUser.id);
        });
      }

      const nonRepeatableItemList = [];
      this.curentWeekOrders.forEach(element => {
        const repeatableItem = nonRepeatableItemList.findIndex(function(el) {
          return el.id === element.item.id;
        });

        if (repeatableItem === -1) {
          nonRepeatableItemList.push({
            id: element.item.id,
            isComplete: element.isComplete,
            occ: 1,
            item: element.item
          });
        } else {
          nonRepeatableItemList[repeatableItem].occ =
            nonRepeatableItemList[repeatableItem].occ + 1;
        }
      });

      this.itemArray = nonRepeatableItemList;

      if (this.itemArray && this.itemArray.length) {
        this.hasItems = true;
      }
    });
  }

  onSubmit() {
    for (const item of this.itemArray) {
      for (const order of this.curentWeekOrders) {
        if (item.id === order.item.id && item.isComplete) {
          order.isComplete = true;
          this.ordersToBeUpdated.push(order);
        }
      }
    }
    this.updateOrders();
  }

  canBeChecked(item: boolean): boolean {
    return item === true;
  }

  test(i) {
    // this.mappedItem.map((i, index) => {
    //   ifqconsole.log();
    // });
  }

  selectOrderToBeUpdated(orderedItemName: String) {
    for (const order of this.allOrders) {
      if (order.item.name === orderedItemName) {
        order.isComplete = true;
        this.ordersToBeUpdated.push(order);
      }
    }
  }
  updateOrders() {
    this.ordersService
      .updateOrders(this.ordersToBeUpdated)
      .then(res => {
        alert('success');
        console.log('success');
      })
      .catch(err => {
        console.error(err);
      });
  }
}
