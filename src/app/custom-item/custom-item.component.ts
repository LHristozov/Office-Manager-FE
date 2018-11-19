import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormPopUpComponent } from '../form-pop-up/form-pop-up.component';

@Component({
  selector: 'app-custom-item',
  templateUrl: './custom-item.component.html',
  styleUrls: ['./custom-item.component.css']
})
export class CustomItemComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  ngOnInit() {

  }
  openFormPopUp() {
    const modalRef = this.modalService.open(FormPopUpComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

}
