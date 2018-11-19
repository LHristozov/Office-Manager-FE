import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ItemService } from '../shared/items/item.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor (private itemService: ItemService,
               private messageService: MessageService) {}

  ngOnInit() {
    const itemNames: string[] = [];
    this.itemService.getAll().subscribe((items) => {
      items.forEach(item => itemNames.push(item.name));
      this.options = itemNames;
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    console.log(value);
    if (value === '') {
      this.messageService.clearMessage();
    }

    const filterValue = value.toLowerCase();
    return this.options.filter(option => value !== '' && option.toLowerCase().includes(filterValue))
                       .sort(Intl.Collator().compare);
    }

  showSelectedItem(selected): void {
    this.messageService.sendMessage(selected);
  }
}
