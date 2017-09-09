import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sc',
  templateUrl: './sc.component.html',
  styleUrls: ['./sc.component.css']
})
export class ScComponent implements OnInit {

  favoriteSeason: string;

  seasons = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];

  constructor() { }

  ngOnInit() {
  }

}
