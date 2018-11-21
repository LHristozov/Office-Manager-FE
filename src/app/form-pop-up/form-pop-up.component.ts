import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ItemService } from '../shared/items/item.service';
import { Item } from '../shared/items/item';
import { _MatListItemMixinBase } from '@angular/material';

@Component({
  selector: 'app-form-pop-up',
  templateUrl: './form-pop-up.component.html',
  styleUrls: ['./form-pop-up.component.css']
})

export class FormPopUpComponent implements OnInit {
  @Input()id: number;
  myForm: FormGroup;
  requestedItem: Item = new Item();
  constructor(private itemService: ItemService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }
  private createForm() {
    this.myForm = this.formBuilder.group({
      title: '',
      description: '',
      category: '',
      pictureUrl: ''
    });
  }
  private submitForm() {
    this.requestedItem.name = this.myForm.value.title;
    this.requestedItem.description = this.myForm.value.description;
    this.requestedItem.category = this.myForm.value.category;
    this.requestedItem.pictureUrl = this.myForm.value.pictureUrl;
    this.requestedItem.isRequested = true;

    this.itemService.requestItem(this.requestedItem).then(res => {
      this.activeModal.close('PopUp Closed');
    }).catch(err => {
      console.error(err);
    });
  }
}
