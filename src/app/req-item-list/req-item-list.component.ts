import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/items/item.service';
import { Item } from '../shared/items/item';

@Component({
  selector: 'app-req-item-list',
  templateUrl: './req-item-list.component.html',
  styleUrls: ['./req-item-list.component.scss']
})
export class ReqItemListComponent implements OnInit {
  reqItemList:  Item[];

  constructor(private itemService: ItemService) {
  }

  private refreshItemList() {
    this.itemService.getItems().subscribe( items => {
      this.reqItemList = items.filter(item => {
         return item.isRequested === true;
        });
    });
  }

  ngOnInit() {
    this.refreshItemList();
  }

  deleteItem(id: string) {
    this.itemService.deleteItem(id).then( () => {
        this.refreshItemList();
      }
    );
  }

  acceptItem(item: Item) {
    item.isRequested = false;
    this.itemService.updateItem(item).then( () => {
        this.refreshItemList();
      }
    );
  }
}
