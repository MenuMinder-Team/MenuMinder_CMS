import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [MessageService]
})
export class MenuComponent implements OnInit {
  selectedOrder;
  listOrder;

  constructor(private orderService: OrderService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    this.orderService.getAllOrder().subscribe({
      next: (res) => {
        this.listOrder = res
      }
    })
  }

  onAddOrder(dish) {
    this.orderService.addNewOrder(dish).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', detail: 'Add success' })
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', detail: err })

      }
    })
  }

  onCheckOut(order) {
    this.orderService.checkOut(order).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', detail: 'Checkout success' })
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', detail: err })
      }
    })
  }

  onChangeTable(table) {
    this.orderService.checkOut(table).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', detail: 'Change success' })
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', detail: err })
      }
    })
  }
}


