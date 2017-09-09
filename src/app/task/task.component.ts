import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnChanges {

  @Input() title;
  @Input() type: string;
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {}


}
