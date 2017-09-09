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
    descr: '9 ist eine Primzahl',
    answer: undefined
  }, {
    descr: 'Jede Primzahl ist ungerade',
    answer: undefined
  }, {
    descr: '2 ist eine Primzahl',
    answer: undefined
  }, {
    descr: 'Jede Primzahl ist gerade',
    answer: undefined
  }];


  constructor() { }

  ngOnInit() {
  }


}
