import { Component, OnInit } from '@angular/core';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  message: string = '';

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastState.subscribe((message: string) => {
      this.message = message;
      setTimeout(() => this.message = '', 3000); // Hide toast after 3 seconds
    });
  }
}
