import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/items/item.service';
import { Item } from '../shared/items/item';
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

  constructor(
    private itemService: ItemService,
    private messageService: MessageService) {
      this.subscription = this.messageService.getMessage().subscribe(
        message => {
          if (message) {
            const filterCategory: string = String(message.text);
            this.filteredItems =
            this.allItems.filter((item) => item.category && item.category === filterCategory);
          } else {
            this.filteredItems = this.allItems;
          }
        });
    }

  ngOnInit() {
    this.itemService.getAll().subscribe( (fetchedItems: Item[]) => {
      this.allItems = fetchedItems;
      this.filteredItems = fetchedItems;
    });
  }
}
