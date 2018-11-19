import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-pop-up',
  templateUrl: './form-pop-up.component.html',
  styleUrls: ['./form-pop-up.component.css']
})


export class FormPopUpComponent implements OnInit {

  @Input()id: number;
  myForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }
  private createForm() {
    this.myForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }
  closePopUp() {
    this.activeModal.close('Modal Closed');
  }
  private submitForm() {
    this.activeModal.close(this.myForm.value);
  }
}
