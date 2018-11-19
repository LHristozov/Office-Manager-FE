import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/items/item.service';
import { Item } from '../shared/items/item';
import { Orders } from '../Orders';
import { Subscription } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  filteredItems: Item[];
  allItems: Item[];
  filter: string = undefined;
  subscription: Subscription;
  orders: any;
  order: Orders = new Orders();
  currentUser;

  constructor(
    private itemService: ItemService,
    private messageService: MessageService) {
      this.subscription = this.messageService.getMessage().subscribe(
        message => {
          if (message) {
            const filterWord: string = String(message.text);
            this.filteredItems =
            this.allItems.filter((item) => item.category
            && (item.category === filterWord || item.name === filterWord));
          } else {
            this.filteredItems = this.allItems;
          }
        });
    }

  ngOnInit() {
    this.itemService.getAll().subscribe((fetchedItems: Item[]) => {
      this.allItems = fetchedItems;
      this.filteredItems = fetchedItems;
      this.itemService.getAllOrders().then(res => {
        this.orders = res;
        this.disableAllLikedItems(undefined);
      });
    });


    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  likeAnItem(item) {
    this.order.item_id = item.id;
    this.order.order_giver_id = this.currentUser.id;

    this.itemService.placeAnOrder(this.order).then(res => {
      this.disableAllLikedItems(item);
    }).catch(err => {
      console.error(err);
    });
  }

  disableAllLikedItems(selectedItem?: Item) {
    for (const order of this.orders) {
      const date = new Date(order.order_date);
      const orderWeek = this.getWeekNumber(date);
      const currentWeek = this.getWeekNumber(new Date());
      if (selectedItem) {
        selectedItem.isDisabled = true;
      } else {
        for (const item of this.filteredItems) {
          if (orderWeek[1] === currentWeek[1]
            && order.order_giver_id === Number(this.currentUser.id)
            && Number(item.id) === order.item_id) {
            item.isDisabled = true;
          }
        }
      }

    }
  }

  private getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    let yearStart: any;
    yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
  }
}
