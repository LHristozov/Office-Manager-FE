import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/items/item.service';
import { Orders } from '../Orders';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  orders: any;
  currentUserOrders: any[] = [];
  mappedItem = new Map<any, any>();
  allOrders: any[] = [];
  ordersToBeUpdated: any = new Array<Orders>();
  currentUser: any;
  isAdmin: Boolean = false;
  items: any;
  itemArray: any[] = [];
  model: any;
  curentWeekOrders: any;
  hasItems: Boolean = false;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.userName === 'hristina') {
      this.isAdmin = true;
    }
    this.itemService.getAllOrders().then(res => {
      this.orders = res;

      this.curentWeekOrders = this.orders.filter(item => {
        const orderDate = this.itemService.getWeekNumber(new Date());
        const curDate = this.itemService.getWeekNumber(
          new Date(item.order_date)
        );

        return orderDate[0] === curDate[0] && orderDate[1] === curDate[1];
      });
      if (!this.isAdmin) {
        this.curentWeekOrders = this.curentWeekOrders.filter(item => {
          return item.order_giver_id === this.currentUser.id;
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
      debugger;
      this.itemArray = nonRepeatableItemList;

      if (this.itemArray && this.itemArray.length) {
        this.hasItems = true;
      }
    });
  }

  onSubmit() {
    for (const o of this.itemArray) {
      for (const order of this.curentWeekOrders) {
        if (o.item.id === order.item.id && o.isComplete) {
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
        order.isCompleted = true;
        this.ordersToBeUpdated.push(order);
      }
    }
  }
  updateOrders() {
    this.itemService
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
