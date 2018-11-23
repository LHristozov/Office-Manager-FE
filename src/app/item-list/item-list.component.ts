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
    this.itemService.getItems().subscribe((fetchedItems: Item[]) => {
      this.allItems = fetchedItems.filter((item) => item.isRequested === false);
      this.filteredItems =  this.allItems;
      this.itemService.getAllOrders().then(res => {
        this.orders = res;
        this.disableAllLikedItems(undefined);
      });
    });


    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  likeAnItem(item) {
    this.order.item = item;
    this.order.order_giver_id = Number(this.currentUser.id);

    this.itemService.placeAnOrder(this.order).then(res => {
      this.disableAllLikedItems(item);
    }).catch(err => {
      console.error(err);
    });
  }

  disableAllLikedItems(selectedItem?: Item) {
    if (selectedItem) {
      selectedItem.isDisabled = true;
    } else {
    for (const order of this.orders) {
      const date = new Date(order.order_date);
      const orderWeek = this.itemService.getWeekNumber(date);
      const currentWeek = this.itemService.getWeekNumber(new Date());
        for (const item of this.filteredItems) {
          if (orderWeek[1] === currentWeek[1]
            && order.order_giver_id === Number(this.currentUser.id)
            && item.id === order.item.id) {
            item.isDisabled = true;
          }
        }
      }

    }
  }


}
