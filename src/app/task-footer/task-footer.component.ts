import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-footer',
  templateUrl: './task-footer.component.html',
  styleUrls: ['./task-footer.component.css']
})
export class TaskFooterComponent implements OnInit {

  submitted;

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.submitted = true;
  }


}
