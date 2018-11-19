import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  filterCoffee(): void {
    this.messageService.sendMessage('COFFEE');
  }

  filterTea(): void {
    this.messageService.sendMessage('TEA');
  }

  filterFruits(): void {
    this.messageService.sendMessage('FRUITS');
  }

  filterOther(): void {
    this.messageService.sendMessage('OTHER');
  }

  clear(): void {
    this.messageService.clearMessage();
  }
}
