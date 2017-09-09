import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tf',
  templateUrl: './tf.component.html',
  styleUrls: ['./tf.component.css']
})
export class TfComponent implements OnInit {

  answer1;
  answer2;
  answer3;
  answer4;

  seasons = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];

  answers = [{
    descr: 'blabla',
    answer: undefined
  }, {
    descr: 'blabla',
    answer: undefined
  }, {
    descr: 'blauss',
    answer: undefined
  }, {
    descr: 'blabla',
    answer: undefined
  }];


  constructor() { }

  ngOnInit() {
  }


}
