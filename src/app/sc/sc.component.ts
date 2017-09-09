import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sc',
  templateUrl: './sc.component.html',
  styleUrls: ['./sc.component.css']
})
export class ScComponent implements OnInit {

  favoriteSeason: string;

  seasons = [
    '12 cm',
    '16 cm',
    '19 cm',
    '21 cm',
  ];

  constructor() { }

  ngOnInit() {
  }

}
