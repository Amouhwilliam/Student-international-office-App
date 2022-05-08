import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {
  name: any;
  title: any;
  description: any;
  animal: any;
  shortdescription: any;

  constructor() {}
  
  ngOnInit(): void {
  }

}
