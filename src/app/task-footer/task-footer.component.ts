import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-footer',
  templateUrl: './task-footer.component.html',
  styleUrls: ['./task-footer.component.css']
})
export class TaskFooterComponent implements OnInit {

  props = {
    isSubmitted: false
  };

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.props.isSubmitted = true;
  }


}
