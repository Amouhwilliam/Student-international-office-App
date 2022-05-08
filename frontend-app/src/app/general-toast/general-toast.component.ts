import { Component, OnInit } from '@angular/core';
import { AppToastService } from '../toast.service';

@Component({
  selector: 'app-general-toast',
  templateUrl: './general-toast.component.html',
  styleUrls: ['./general-toast.component.scss']
})
export class GeneralToastComponent implements OnInit {
  toastService: any
  constructor(toastService: AppToastService) {
    this.toastService = toastService
  }

  ngOnInit(): void {
  }

}
