import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/items/item.service';
import { Item } from '../shared/items/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: Item[];
  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getAll().subscribe( (fetchedItems: Item[]) => {
      this.items = fetchedItems;
    });
  }
}
